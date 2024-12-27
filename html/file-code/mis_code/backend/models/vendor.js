const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
});

module.exports = mongoose.model('Vendor', vendorSchema);