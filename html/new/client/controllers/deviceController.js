// Device controller for handling device-related functionalities

document.getElementById('addDeviceForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const deviceName = formData.get('deviceName');
  const relayCount = formData.get('relayCount');
  try {
    const token = localStorage.getItem('token');
    await addDevice(deviceName, relayCount, token);
    fetchDevices(token);
  } catch (error) {
    console.error('Failed to add device:', error.message);
  }
});

async function addDevice(deviceName, relayCount, token) {
  const response = await fetch('http://localhost:3000/api/devices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ name: deviceName, relayCount }),
  });
  console.log(await response.text());
}

async function fetchDevices(token) {
  try {
    const response = await fetch('http://localhost:3000/api/devices', {
      headers: {
        Authorization: token,
      },
    });
    const devices = await response.json();
    console.log(devices);
    const deviceList = document.getElementById('deviceList');
    deviceList.innerHTML = '';
    devices.forEach(device => {
      const li = document.createElement('li');
      li.innerHTML = `${device.name}`;
      const relayStates = device.relays;
      const relayButtons = relayStates.map((state, index) => {
        const button = document.createElement('button');
        button.textContent = `Relay ${index + 1} (${state ? 'ON' : 'OFF'})`;
        button.addEventListener('click', () => toggleRelay(device._id, index, !state, token));
        return button;
      });

      const deleteBTN = document.createElement('button');
      deleteBTN.textContent = `Delete`;
      deleteBTN.addEventListener('click', () => deleteDevice(device._id, token));
      li.appendChild(deleteBTN);
      relayButtons.forEach(button => {
        li.appendChild(button);
      });
      deviceList.appendChild(li);
    });
  } catch (error) {
    console.error('Failed to fetch devices:', error.message);
  }
}

async function toggleRelay(deviceId, relayIndex, state, token) {
  try {
    const response = await fetch(`http://localhost:3000/api/devices/${deviceId}/relays/${relayIndex}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ state }),
    });
    console.log(await response.text());
    fetchDevices(token); // Refresh device list after toggling relay
  } catch (error) {
    console.error('Failed to toggle relay:', error.message);
  }
}

async function deleteDevice(deviceId, token) {
  try {
    const response = await fetch(`http://localhost:3000/api/devices/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      fetchDevices(token);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const a = localStorage.getItem('token');
fetchDevices(a);
