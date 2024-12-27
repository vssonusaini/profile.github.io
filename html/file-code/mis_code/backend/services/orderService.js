const Order = require('../models/order');
const mailService = require("./mailService")

const createOrder = async (orderData) => {
    try {
      const order = new Order(orderData);
     await order.save();
       return order;
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('userId').populate('vendorId').sort({createdAt:-1});
        return orders
    } catch (error) {
        throw new Error(`Error getting orders: ${error.message}`);
    }
}
const getOrderById = async(id)=>{
    try {
       const order = await Order.findById(id).populate('userId').populate('vendorId');
       return order;
    } catch (error) {
        throw new Error(`Error getting order: ${error.message}`);
    }
  }
const updateOrder = async (id, updateData) => {
  try {
      const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
        new: true,
      });

        if (updateData.status) {

          const order = await Order.findById(id).populate('userId')
          const userEmail = order.userId.username;
          let emailText = `Your order status updated to ${updateData.status}`;
            if(updateData.remarks){
                emailText += `, with remark: ${updateData.remarks}`
            }
            mailService.sendMail(userEmail,`Order update - ${order._id}`,emailText)
        }

      return updatedOrder;
    } catch (error) {
      throw new Error(`Error updating order: ${error.message}`);
    }
};
const deleteOrder = async (id) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {
      throw new Error(`Error deleting order: ${error.message}`);
    }
  };

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };