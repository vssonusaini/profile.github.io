const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

router.get('/orders', async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
     const packingOrders = orders.filter((order)=> order.status === 'packing');
    res.status(200).json(packingOrders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
    router.get('/orders/:id', async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
router.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
     res.status(500).send({ message: error.message });
  }
});

module.exports = router;