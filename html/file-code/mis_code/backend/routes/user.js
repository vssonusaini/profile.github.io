const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const vendorService = require('../services/vendorService');

router.get('/vendors', async (req, res) => {
    try {
        const vendors = await vendorService.getAllVendors();
    res.status(200).json(vendors);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})
router.post('/orders', async (req, res) => {
try {
    const orderData = { ...req.body, userId: req.user.id };
   const order = await orderService.createOrder(orderData);
    res.status(201).json(order);
} catch (error) {
    res.status(500).send({ message: error.message });
}
});
router.get('/orders', async (req, res) => {
try {
    const orders = await orderService.getAllOrders();
   const userOrders = orders.filter((order)=> order.userId._id.toString() === req.user.id.toString())
    res.status(200).json(userOrders);
} catch (error) {
    res.status(500).send({ message: error.message });
}
});

module.exports = router;