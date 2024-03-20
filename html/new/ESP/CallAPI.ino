#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>//6.9.0
#include <WiFiClient.h>

// WiFi credentials
const char* ssid = "iPhone";
const char* password = "9812846715Vss";

// IP address and port of the Node.js server
const char* serverIP = "172.20.10.2";  // Change this to your server's IP address
const int serverPort = 3000;
const char* Authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY5ZWFkNjhkMTExMDc3ZTQ2ZTYzOTgiLCJpYXQiOjE3MTA4Nzc0Nzd9.ARBaTDj33xTZCmKXkJ5jNkkqbrByz9SNL3GWi6u03AM";
const char* deviceId = "65f9eb368d111077e46e63a6";

const int relayPins[] = { D0, D1, D2, D3 };

void setup() {
  Serial.begin(115200);



  // Connect to WiFi
  connectToWiFi();

  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
}

WiFiClient client;

bool convertToJson(const tm& t, JsonVariant variant) {
  char buffer[32];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S.%f", &t);
  return variant.set(buffer);
}

void loop() {
  // Example: GET request to fetch relay states
  getRelayStates(deviceId,Authorization);

  // // Example: POST request to update relay states
  // updateRelayStates("nodeMCU1", { true, false, true, false });

  // // Example: PUT request to update relay state of a specific relay
  // updateRelayState("nodeMCU1", 0, true);

  delay(500);  // Adjust delay as needed
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}

void getRelayStates(String deviceId, String Authorization) {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/api/devices/" + deviceId;
    http.begin(client, url);
        http.addHeader("Authorization", Authorization);
    int httpCode = http.GET();
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println("Response content: " + payload);

        // Parse JSON response
        DynamicJsonDocument doc(1024);
        deserializeJson(doc, payload);
        JsonArray relays = doc["relays"];

        // Example: Print relay states
        for (int i = 0; i < relays.size(); i++) {
          Serial.print("Relay ");
          Serial.print(i);
          Serial.print(": ");
          Serial.println(relays[i].as<bool>() ? "ON" : "OFF");
          digitalWrite(relayPins[i], relays[i].as<bool>() ? 0 : 1);
        }
      }
    } else {
      Serial.println("HTTP request failed");
    }
    http.end();
  }
}

void updateRelayStates(String deviceId, std::vector<bool> newStates) {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/device/" + deviceId;
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    // Convert vector to JSON array
    DynamicJsonDocument doc(1024);
    JsonArray relays = doc.to<JsonArray>();
    for (size_t i = 0; i < newStates.size(); i++) {
      relays.add(newStates[i]);
    }
    String payload;
    serializeJson(doc, payload);

    int httpCode = http.POST(payload);
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.println("New relay states: " + response);
      }
    } else {
      Serial.println("HTTP request failed");
    }
    http.end();
  }
}

void updateRelayState(String deviceId, int relayIndex, bool newState) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/device/" + deviceId + "/" + String(relayIndex);
    http.begin(client, url);
    http.addHeader("Content-Type", "application/json");

    // Create JSON payload
    DynamicJsonDocument doc(1024);
    doc["newState"] = newState;
    String payload;
    serializeJson(doc, payload);

    int httpCode = http.PUT(payload);
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.println("Updated relay state: " + response);
      }
    } else {
      Serial.println("HTTP request failed");
    }
    http.end();
  }
}
