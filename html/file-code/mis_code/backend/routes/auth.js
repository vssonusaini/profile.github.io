const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
const { username, password } = req.body;

    try {
    const user = await userService.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
       return res.status(401).json({ message: 'Invalid credentials' });
    }
        res.status(200).json({
            message:"Login successful",
             user:{
                 id: user._id,
                 username: user.username,
                 role: user.role
             }
        });
    } catch (error) {
    console.error(error);
        res.status(500).json({ message: error.message });
    }
});

    module.exports = router;