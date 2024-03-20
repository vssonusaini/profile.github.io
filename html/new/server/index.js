const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://sonusaini:2Dn7zDMjgVOLNlaq@cluster0.4ket0e8.mongodb.net/NewNodeDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Define device schema
const deviceSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  relays: [Boolean],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Device = mongoose.model('Device', deviceSchema);

// Middleware for authenticating users
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, 'secret');
    res.send(token);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Create device endpoint
app.post('/api/devices', authenticateUser, async (req, res) => {
  try {
    const { name, relayCount } = req.body;
    const device = new Device({
      name,
      relays: Array.from({ length: relayCount }, () => false),
      user: req.user._id,
    });
    await device.save();
    res.status(201).send('Device created successfully');
  } catch (error) {
    res.status(500).send('Error creating device');
  }
});

// Get all devices endpoint
app.get('/api/devices', authenticateUser, async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id });
    res.send(devices);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Get all devices endpoint
app.get('/api/devices/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const devices = await Device.find({ _id: id, user: req.user._id });
    res.send(devices[0]);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Update relay state endpoint
app.put('/api/devices/:id/relays/:index', authenticateUser, async (req, res) => {
  try {
    const { id, index } = req.params;
    const device = await Device.findOne({ _id: id, user: req.user._id });
    if (!device) return res.status(404).send('Device not found');

    const { state } = req.body;
    device.relays[index] = state;
    await device.save();
    res.send('Relay state updated successfully');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Delete Device
app.delete('/api/devices/:deviceId', authenticateUser, async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.deviceId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
