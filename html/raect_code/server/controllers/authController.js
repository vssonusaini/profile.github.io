const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Helper function to generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// SIGNUP
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ username, email, password: hashedPassword });
        await user.save();
        const token = generateToken(user._id);
        res.status(201).json({ msg: 'User registered successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ msg: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// FORGET PASSWORD
const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found with this email.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

        await user.save();
        // Send email
        const mailOptions = {
            from: process.env.SMTP_USER, // Sender
            to: email,
            subject: "Password Reset Request",
            html: `
         <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
         <p>Please click on the following link, or paste this into your browser to complete the process:</p>
         <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a>
         <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ msg: "Failed to send reset password email" });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ msg: 'Reset token sent to your email.' });
            }
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetToken,
            resetTokenExpiration: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired reset token' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;

        await user.save();
        res.json({ msg: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { signup, login, forgetPassword, resetPassword };