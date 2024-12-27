const Vendor = require('../models/vendor');

const createVendor = async (vendorData) => {
  const vendor = new Vendor(vendorData);
    try {
     await vendor.save();
    return vendor
    } catch (error) {
        throw new Error(`Error creating vendor: ${error.message}`);
    }
};
const getAllVendors = async () => {
    try {
        const vendors = await Vendor.find();
        return vendors;
    } catch (error) {
      throw new Error(`Error getting vendors: ${error.message}`);
    }
  };
const getVendorById = async(id)=>{
    try {
       const vendor = await Vendor.findById(id);
       return vendor;
    } catch (error) {
       throw new Error(`Error getting vendor: ${error.message}`);
    }
  }
const updateVendor = async (id, updateData) => {
    try {
      const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return updatedVendor;
    } catch (error) {
       throw new Error(`Error updating vendor: ${error.message}`);
    }
  };

  const deleteVendor = async (id) => {
    try {
      const deletedVendor = await Vendor.findByIdAndDelete(id);
      return deletedVendor;
    } catch (error) {
        throw new Error(`Error deleting vendor: ${error.message}`);
    }
  };
module.exports = { createVendor, getAllVendors,getVendorById, updateVendor, deleteVendor };