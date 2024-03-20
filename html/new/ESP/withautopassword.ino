#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>

#include <ESP8266WebServer.h>
#include <EEPROM.h>

// WiFi credentials
const char* ssid = "iPhone";
const char* password = "9812846715Vss";

// IP address and port of the Node.js server
const char* serverIP = "172.20.10.2";  // Change this to your server's IP address
const int serverPort = 3000;
const char* Authorization = "";
const char* deviceId = "";

//Variables
int i = 0;
int statusCode;
String st;
String content;

IPAddress local_IP(192, 168, 1, 184);
// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);  //optional
IPAddress secondaryDNS(8, 8, 4, 4);

//Function Decalration
bool testWifi(void);
void launchWeb(void);
void setupAP(void);

const int relayPins[] = { D0, D1, D2, D3 };

ESP8266WebServer server(80);

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



void loop() {
  // Example: GET request to fetch relay states
  getRelayStates(deviceId, Authorization);


  // // Example: POST request to update relay states
  // updateRelayStates("nodeMCU1", { true, false, true, false });

  // // Example: PUT request to update relay state of a specific relay
  // updateRelayState("nodeMCU1", 0, true);

  delay(500);  // Adjust delay as needed
}

void connectToWiFi() {
  // Configures static IP address
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("STA Failed to configure");
  }

  Serial.begin(115200);  //Initialising if(DEBUG)Serial Monitor
  Serial.println();
  Serial.println("Disconnecting previously connected WiFi");
  WiFi.disconnect();
  EEPROM.begin(512);  //Initialasing EEPROM
  delay(10);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println();
  Serial.println();
  Serial.println("Startup");


  //---------------------------------------- Read eeprom for ssid and pass
  Serial.println("Reading EEPROM ssid");

  String esid;
  for (int i = 0; i < 32; ++i) {
    esid += char(EEPROM.read(i));
  }
  Serial.println();
  Serial.print("SSID: ");
  Serial.println(esid);
  Serial.println("Reading EEPROM pass");

  String epass = "";
  for (int i = 32; i < 96; ++i) {
    epass += char(EEPROM.read(i));
  }
  Serial.print("PASS: ");
  Serial.println(epass);

  String Authorization = "";
  for (int i = 96; i < 256; ++i) {
    Authorization += char(EEPROM.read(i));
  }
  Serial.print("Authorization: ");
  Serial.println(Authorization);

   String deviceId = "";
  for (int i = 256; i < 288; ++i) {
    deviceId += char(EEPROM.read(i));
  }
  Serial.print("deviceId: ");
  Serial.println(deviceId);


 
  WiFi.begin(esid.c_str(), epass.c_str());
  if (testWifi()) {
    Serial.println("Succesfully Connected!!!");
    return;
  } else {
    Serial.println("Turning the HotSpot On");
    launchWeb();
    setupAP();  // Setup HotSpot
  }

  Serial.println();
  Serial.println("Waiting.");

  while ((WiFi.status() != WL_CONNECTED)) {
    Serial.print(".");
    delay(100);
    server.handleClient();
  }
}

bool convertToJson(const tm& t, JsonVariant variant) {
  char buffer[32];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S.%f", &t);
  return variant.set(buffer);
}

void getRelayStates(String deviceId, String Authorization) {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    String url = "http://" + String(serverIP) + ":" + String(serverPort) + "/api/devices/" + deviceId;
        Serial.print(url);
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

//----------------------------------------------- Config Functios
bool testWifi(void) {
  int c = 0;
  Serial.println("Waiting for Wifi to connect");
  while (c < 20) {
    if (WiFi.status() == WL_CONNECTED) {
      return true;
    }
    delay(500);
    Serial.print("*");
    c++;
  }
  Serial.println("");
  Serial.println("Connect timed out, opening AP");
  return false;
}

void launchWeb() {
  Serial.println("");
  if (WiFi.status() == WL_CONNECTED)
    Serial.println("WiFi connected");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());
  Serial.print("SoftAP IP: ");
  Serial.println(WiFi.softAPIP());
  createWebServer();
  // Start the server
  server.begin();
  Serial.println("Server started");
}

void setupAP(void) {
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0)
    Serial.println("no networks found");
  else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*");
      delay(10);
    }
  }
  Serial.println("");
  st = "<ol>";
  for (int i = 0; i < n; ++i) {
    // Print SSID and RSSI for each network found
    st += "<li>";
    st += WiFi.SSID(i);
    st += " (";
    st += WiFi.RSSI(i);

    st += ")";
    st += (WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*";
    st += "</li>";
  }
  st += "</ol>";
  delay(100);
  WiFi.softAP("PetalFab-Chip", "");
  Serial.println("softap");
  launchWeb();
  Serial.println("over");
}

void createWebServer() {
  {
    server.on("/", []() {
      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
      content = "{\"status\":\"true\",\"deviceId\":\"f63546a9-9de2-4aae-bb2f-f7b60fa74578\",\"deviceType\":\"4\"}";
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(200, "application/json", content);
    });
    server.on("/scan", []() {
      //setupAP();
      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);

      content = "<!DOCTYPE HTML>\r\n<html>go back";
      server.send(200, "text/html", content);
    });

    server.on("/setting", []() {
      String qsid = server.arg("ssid");
      String qpass = server.arg("pass");
      String authorization = server.arg("authorization");
         String deviceId = server.arg("deviceId");
      if (qsid.length() > 0 && qpass.length() > 0) {
        Serial.println("clearing eeprom");
        for (int i = 0; i < 96; ++i) {
          EEPROM.write(i, 0);
        }
        Serial.println(qsid);
        Serial.println("");
        Serial.println(qpass);
        Serial.println("");

        Serial.println("writing eeprom ssid:");
        for (int i = 0; i < qsid.length(); ++i) {
          EEPROM.write(i, qsid[i]);
          Serial.print("Wrote: ");
          Serial.println(qsid[i]);
        }
        Serial.println("writing eeprom pass:");
        for (int i = 0; i < qpass.length(); ++i) {
          EEPROM.write(32 + i, qpass[i]);
          Serial.print("Wrote: ");
          Serial.println(qpass[i]);
        }
         Serial.println("writing authorization pass:");
        for (int i = 0; i < authorization.length(); ++i) {
          EEPROM.write(96 + i, authorization[i]);
          Serial.print("Wrote: ");
          Serial.println(authorization[i]);
        }
          Serial.println("writing deviceId pass:");
        for (int i = 0; i < deviceId.length(); ++i) {
          EEPROM.write(256 + i, deviceId[i]);
          Serial.print("Wrote: ");
          Serial.println(deviceId[i]);
        }
        EEPROM.commit();

        content = "{\"status\":\"fulse\",\"deviceId\":\"f63546a9-9de2-4aae-bb2f-f7b60fa74578\",\"deviceType\":\"4\"}";
        statusCode = 200;
        ESP.reset();
      } else {
        content = "{\"Error\":\"404 not found\"}";
        statusCode = 404;
        Serial.println("Sending 404");
      }
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(statusCode, "application/json", content);
    });
  }
}