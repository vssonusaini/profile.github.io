const mongoose = require('mongoose');

const packingStateSchema = new mongoose.Schema({
    state: { type: String, required: true },
    description: { type: String },
    // Add more fields if needed
});

module.exports = mongoose.model('PackingState', packingStateSchema);