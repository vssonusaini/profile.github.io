const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Add more fields if needed
});

module.exports = mongoose.model('Admin', adminSchema);