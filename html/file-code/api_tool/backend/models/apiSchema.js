// backend/models/apiSchema.js
const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    method: {
        type: String,
        required: true,
        enum: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    fields: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['string', 'number', 'boolean', 'object', 'array']
        },
        required: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            trim: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Api', apiSchema);