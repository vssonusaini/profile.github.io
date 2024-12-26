const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    //Add more fields here if necessary
});

module.exports = mongoose.model('Category', categorySchema);