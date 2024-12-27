const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const vendorService = require('../services/vendorService');
const orderService = require('../services/orderService');

router.get('/users', async (req, res) => {
    try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
});
router.post('/users', async (req, res) => {
    try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
});
router.get('/users/:id', async (req, res) => {
    try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
router.put('/users/:id', async (req, res) => {
    try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
});
router.delete('/users/:id', async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
    res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/vendors', async (req, res) => {
    try {
    const vendors = await vendorService.getAllVendors();
    res.status(200).json(vendors);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
router.post('/vendors', async (req, res) => {
    try {
    const vendor = await vendorService.createVendor(req.body);
    res.status(201).json(vendor);
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
});
router.get('/vendors/:id', async (req, res) => {
    try {
        const vendor = await vendorService.getVendorById(req.params.id);
    res.status(200).json(vendor);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
router.put('/vendors/:id', async (req, res) => {
    try {
    const updatedVendor = await vendorService.updateVendor(req.params.id, req.body);
    res.status(200).json(updatedVendor);
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
});
router.delete('/vendors/:id', async (req, res) => {
    try {
    await vendorService.deleteVendor(req.params.id);
    res.status(204).send();
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
});
router.get('/orders', async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
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
router.delete('/orders/:id', async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);
    res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;