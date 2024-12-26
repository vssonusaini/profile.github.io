const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    state: { type: String, required: true },
    description: { type: String },
    // Add more fields if needed
});

module.exports = mongoose.model('Delivery', deliverySchema);