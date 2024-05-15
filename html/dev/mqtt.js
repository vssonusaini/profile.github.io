 // MQTT broker configuration
      const MQTT_BROKER = 'mqtt://broker.hivemq.com';
      const MQTT_PORT = 800;

      // Create a client instance
      const client = new Paho.MQTT.Client(MQTT_BROKER, MQTT_PORT, 'clientId');

      // Set callback handlers
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      // Connect the client
      client.connect({ onSuccess: onConnect });

      // Called when the client connects
      function onConnect() {
        console.log('Connected to MQTT broker');
      }

      // Called when the client loses its connection
      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log('Connection lost:', responseObject.errorMessage);
        }
      }

      // Called when a message arrives
      function onMessageArrived(message) {
        console.log('Message arrived:', message.payloadString);
        const topic = message.destinationName;
        const payload = message.payloadString;
        displayMessage(topic, payload);
      }

      // Publish a message
      function sendMessage() {
        const topic = document.getElementById('topic').value;
        const message = document.getElementById('message').value;

        if (!topic || !message) {
          alert('Please enter both topic and message');
          return;
        }

        const messageObj = new Paho.MQTT.Message(message);
        messageObj.destinationName = topic;
        client.send(messageObj);
      }

      // Display received message
      function displayMessage(topic, message) {
        const messagesDiv = document.getElementById('messages');
        const p = document.createElement('p');
        p.textContent = `[${topic}] ${message}`;
        messagesDiv.appendChild(p);
      }