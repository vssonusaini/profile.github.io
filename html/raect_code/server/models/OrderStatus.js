const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ['packing done', 'ready for dispatch', 'dispatched', 'in transit'] },
    email: { type: String, required: true },
    // Add more fields if necessary like timestamps
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps


module.exports = mongoose.model('OrderStatus', orderStatusSchema);