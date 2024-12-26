const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllUsers,
    updateUser,
    deleteUser,
    addVendor,
    getAllVendors,
    addCategory,
    getAllCategories,
    addAdmin,
    getAllAdmins,
    deleteAdmin,
    addDelivery,
    getAllDeliveries,
    deleteDelivery,
    addPackingState,
    getAllPackingStates,
    deletePackingState,
    updateAdmin,
    updateDelivery,
    updatePackingState,
    updateVendor,
    deleteVendor,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    getAllOrderStatuses,
    addOrderStatus,
    deleteOrderStatus
} = require('../controllers/adminController');

// Admin routes, protected by authMiddleware (ensure only admins have access)
router.use(authMiddleware);

// Previous routes like users, vendors, categories
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


router.post('/vendors', addVendor);
router.get('/vendors', getAllVendors);
router.put('/vendors/:id', updateVendor);
router.delete('/vendors/:id', deleteVendor);

router.post('/categories', addCategory);
router.get('/categories', getAllCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// ADMINS Routes
router.post('/admins', addAdmin);
router.get('/admins', getAllAdmins);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

// DELIVERY ROUTES
router.post('/deliveries', addDelivery);
router.get('/deliveries', getAllDeliveries);
router.put('/deliveries/:id', updateDelivery);
router.delete('/deliveries/:id', deleteDelivery);

// PACKING STATES ROUTES
router.post('/packing-states', addPackingState);
router.get('/packing-states', getAllPackingStates);
router.put('/packing-states/:id', updatePackingState);
router.delete('/packing-states/:id', deletePackingState);


// ORDER STATUS ROUTES
router.post('/order-statuses', addOrderStatus);
router.get('/order-statuses', getAllOrderStatuses);
router.put('/order-statuses', updateOrderStatus);
router.delete('/order-statuses/:id', deleteOrderStatus);

module.exports = router;