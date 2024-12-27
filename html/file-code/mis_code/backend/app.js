const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const packingRoutes = require('./routes/packing');
const dispatchRoutes = require('./routes/dispatch');
const authRoutes = require('./routes/auth')
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:3001", // Client-side URL
    credentials: true
}));
app.use(express.json());

// Custom authentication middleware
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    try {
        const decodedToken = JSON.parse(token);
        req.user = decodedToken
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

// Routes
app.use('/auth', authRoutes);
app.use('/admin', authenticateUser, adminRoutes);
app.use('/user', authenticateUser, userRoutes);
app.use('/packing', authenticateUser, packingRoutes);
app.use('/dispatch', authenticateUser, dispatchRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});