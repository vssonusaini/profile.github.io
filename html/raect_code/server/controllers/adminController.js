const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Category = require('../models/Category');
const Admin = require('../models/Admin');
const Delivery = require('../models/Delivery');
const PackingState = require('../models/PackingState');
const OrderStatus = require('../models/OrderStatus');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


// Helper function to send email
const sendStatusUpdateEmail = async (email, orderId, newStatus) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: `Order Status Updated - Order ID: ${orderId}`,
        html: `
    <p>Your order with ID ${orderId} has been updated to: <strong>${newStatus}</strong></p>
    <p>Thank you for your patience.</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Status update email sent successfully');
    } catch (error) {
        console.error('Failed to send status update email', error);
        throw new Error("Failed to send status update email");
    }
};


// ADMIN FUNCTIONS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, isAdmin } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, email, isAdmin },
            { new: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// ADMIN TABLE FUNCTIONS
const addAdmin = async (req, res) => {
    const { name } = req.body;
    try {
        const admin = new Admin({ name });
        await admin.save();
        res.status(201).json({ msg: 'Admin added successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }
        res.json({ msg: 'Admin deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const admin = await Admin.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// DELIVERY TABLE FUNCTIONS
const addDelivery = async (req, res) => {
    const { state, description } = req.body;
    try {
        const delivery = new Delivery({ state, description });
        await delivery.save();
        res.status(201).json({ msg: 'Delivery state added successfully', delivery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.json(deliveries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const deleteDelivery = async (req, res) => {
    const { id } = req.params;
    try {
        const delivery = await Delivery.findByIdAndDelete(id);
        if (!delivery) {
            return res.status(404).json({ msg: 'Delivery state not found' });
        }
        res.json({ msg: 'Delivery state deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const updateDelivery = async (req, res) => {
    const { id } = req.params;
    const { state, description } = req.body;
    try {
        const delivery = await Delivery.findByIdAndUpdate(
            id,
            { state, description },
            { new: true }
        );
        if (!delivery) {
            return res.status(404).json({ msg: 'Delivery state not found' });
        }
        res.json(delivery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// PACKING STATE TABLE FUNCTIONS
const addPackingState = async (req, res) => {
    const { state, description } = req.body;
    try {
        const packingState = new PackingState({ state, description });
        await packingState.save();
        res.status(201).json({ msg: 'Packing state added successfully', packingState });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllPackingStates = async (req, res) => {
    try {
        const packingStates = await PackingState.find();
        res.json(packingStates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const deletePackingState = async (req, res) => {
    const { id } = req.params;
    try {
        const packingState = await PackingState.findByIdAndDelete(id);
        if (!packingState) {
            return res.status(404).json({ msg: 'Packing State not found' });
        }
        res.json({ msg: 'Packing State deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const updatePackingState = async (req, res) => {
    const { id } = req.params;
    const { state, description } = req.body;
    try {
        const packingState = await PackingState.findByIdAndUpdate(
            id,
            { state, description },
            { new: true }
        );
        if (!packingState) {
            return res.status(404).json({ msg: 'Packing State not found' });
        }
        res.json(packingState);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// VENDOR TABLE FUNCTIONS
const addVendor = async (req, res) => {
    const { name, description } = req.body;
    try {
        const vendor = new Vendor({ name, description });
        await vendor.save();
        res.status(201).json({ msg: 'Vendor added successfully', vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const updateVendor = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }
        res.json(vendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendor = await Vendor.findByIdAndDelete(id);
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }
        res.json({ msg: 'Vendor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// CATEGORY TABLE FUNCTIONS
const addCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({ msg: 'Category added successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json({ msg: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// ORDER STATUS TABLE FUNCTIONS
const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {

        let order = await OrderStatus.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }


        if (order.status === status) {
            return res.status(400).json({ msg: 'Order status is already updated to this state' });
        }


        order.status = status;
        await order.save();
        // Send Email Notification
        await sendStatusUpdateEmail(order.email, orderId, status);
        res.status(200).json({ msg: 'Order status updated successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error ' + error.message });
    }
};
const getAllOrderStatuses = async (req, res) => {
    try {
        const orderStatuses = await OrderStatus.find();
        res.json(orderStatuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const addOrderStatus = async (req, res) => {
    const { orderId, status, email } = req.body;

    try {
        let order = await OrderStatus.findOne({ orderId });
        if (order) {
            return res.status(400).json({ msg: 'Order status already exists for this Order ID' });
        }
        const newOrder = new OrderStatus({ orderId, status, email });
        await newOrder.save();
        // Send Email Notification
        await sendStatusUpdateEmail(email, orderId, status);
        res.status(201).json({ msg: "Order status added Successfully", newOrder })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' + error.message });
    }
};
const deleteOrderStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const orderStatus = await OrderStatus.findByIdAndDelete(id);
        if (!orderStatus) {
            return res.status(404).json({ msg: 'Order status not found' });
        }
        res.json({ msg: 'Order status deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};


module.exports = {
    // Previous exported functions, plus
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
    deleteOrderStatus,
};