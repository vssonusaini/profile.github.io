import React, { useState, useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import EditUserModal from '../components/EditUserModal';
import AddVendorModal from '../components/AddVendorModal';
import AddCategoryModal from '../components/AddCategoryModal';
import AddAdminModal from "../components/AddAdminModal";
import AddDeliveryModal from "../components/AddDeliveryModal";
import AddPackingStateModal from "../components/AddPackingStateModal";
import EditAdminModal from "../components/EditAdminModal";
import EditDeliveryModal from "../components/EditDeliveryModal";
import EditPackingStateModal from "../components/EditPackingStateModal";
import EditVendorModal from "../components/EditVendorModal";
import EditCategoryModal from "../components/EditCategoryModal";
import UpdateStatusModal from "../components/UpdateStatusModal";
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [packingStates, setPackingStates] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);


    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [selectedPackingState, setSelectedPackingState] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [isAddDeliveryModalOpen, setIsAddDeliveryModalOpen] = useState(false);
    const [isAddPackingStateModalOpen, setIsAddPackingStateModalOpen] = useState(false);
    const [isEditAdminModalOpen, setIsEditAdminModalOpen] = useState(false);
    const [isEditDeliveryModalOpen, setIsEditDeliveryModalOpen] = useState(false);
    const [isEditPackingStateModalOpen, setIsEditPackingStateModalOpen] = useState(false);
    const [isEditVendorModalOpen, setIsEditVendorModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);


    // Fetch functions for the Admin, Delivery, and Packing States data
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchVendors = async () => {
        try {
            const response = await axios.get('/api/admin/vendors', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setVendors(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/admin/categories', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('/api/admin/admins', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setAdmins(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDeliveries = async () => {
        try {
            const response = await axios.get('/api/admin/deliveries', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setDeliveries(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchPackingStates = async () => {
        try {
            const response = await axios.get('/api/admin/packing-states', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setPackingStates(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchOrderStatuses = async () => {
        try {
            const response = await axios.get('/api/admin/order-statuses', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setOrderStatuses(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUsers();
        fetchVendors();
        fetchCategories();
        fetchAdmins();
        fetchDeliveries();
        fetchPackingStates();
        fetchOrderStatuses();
    }, []);

    // Functions to handle Admin, Delivery, and Packing State data
    const handleEditUser = (userId) => {
        const userToEdit = users.find((user) => user._id === userId);
        setSelectedUser(userToEdit);
        setIsEditModalOpen(true);
    };
    const handleUpdateUser = async (userId, updatedData) => {
        try {
            await axios.put(`/api/admin/users/${userId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error(error);
        }
    };
    const handleMakeAdmin = async (userId) => {
        try {
            const updatedData = users.find((user) => user._id === userId);
            await axios.put(`/api/admin/users/${userId}`, { ...updatedData, isAdmin: true }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddVendor = async (vendorData) => {
        try {
            await axios.post('/api/admin/vendors', vendorData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchVendors();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditVendor = (vendor) => {
        setSelectedVendor(vendor);
        setIsEditVendorModalOpen(true);
    };
    const handleUpdateVendor = async (vendorId, updatedData) => {
        try {
            await axios.put(`/api/admin/vendors/${vendorId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchVendors();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteVendor = async (vendorId) => {
        try {
            await axios.delete(`/api/admin/vendors/${vendorId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchVendors();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddCategory = async (categoryData) => {
        try {
            await axios.post('/api/admin/categories', categoryData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsEditCategoryModalOpen(true);
    };
    const handleUpdateCategory = async (categoryId, updatedData) => {
        try {
            await axios.put(`/api/admin/categories/${categoryId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`/api/admin/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddAdmin = async (adminData) => {
        try {
            await axios.post('/api/admin/admins', adminData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchAdmins(); // Refresh the admin list
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditAdmin = (admin) => {
        setSelectedAdmin(admin);
        setIsEditAdminModalOpen(true);
    };
    const handleUpdateAdmin = async (adminId, updatedData) => {
        try {
            await axios.put(`/api/admin/admins/${adminId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchAdmins(); // Refresh the admin list
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteAdmin = async (adminId) => {
        try {
            await axios.delete(`/api/admin/admins/${adminId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchAdmins(); // Refresh the admin list
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddDelivery = async (deliveryData) => {
        try {
            await axios.post('/api/admin/deliveries', deliveryData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchDeliveries();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditDelivery = (delivery) => {
        setSelectedDelivery(delivery);
        setIsEditDeliveryModalOpen(true);
    };
    const handleUpdateDelivery = async (deliveryId, updatedData) => {
        try {
            await axios.put(`/api/admin/deliveries/${deliveryId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchDeliveries(); // Refresh the deliveries list
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteDelivery = async (deliveryId) => {
        try {
            await axios.delete(`/api/admin/deliveries/${deliveryId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchDeliveries(); // Refresh the deliveries list
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddPackingState = async (packingStateData) => {
        try {
            await axios.post('/api/admin/packing-states', packingStateData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchPackingStates();
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditPackingState = (packingState) => {
        setSelectedPackingState(packingState);
        setIsEditPackingStateModalOpen(true);
    };
    const handleUpdatePackingState = async (packingStateId, updatedData) => {
        try {
            await axios.put(`/api/admin/packing-states/${packingStateId}`, updatedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchPackingStates();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeletePackingState = async (packingStateId) => {
        try {
            await axios.delete(`/api/admin/packing-states/${packingStateId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchPackingStates();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateStatus = async (orderData) => {
        try {
            await axios.put(`/api/admin/order-statuses`, orderData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchOrderStatuses();
        } catch (error) {
            console.error(error);
        }
    }
    const handleAddStatus = async (orderData) => {
        try {
            await axios.post(`/api/admin/order-statuses`, orderData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchOrderStatuses();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteStatus = async (orderId) => {
        try {
            await axios.delete(`/api/admin/order-statuses/${orderId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            fetchOrderStatuses();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsUpdateStatusModalOpen(true);
    };

    return (
        <div>
            <h2>Admin Panel</h2>

            <h3>Users</h3>
            <AdminTable
                data={users}
                columns={['_id', 'username', 'email', 'isAdmin']}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onMakeAdmin={handleMakeAdmin}
            />

            <h3>Vendors</h3>
            <button onClick={() => setIsAddVendorModalOpen(true)}>Add Vendor</button>
            <AdminTable
                data={vendors}
                columns={['_id', 'name', 'description']}
                onEdit={handleEditVendor}
                onDelete={handleDeleteVendor}
            />

            <h3>Categories</h3>
            <button onClick={() => setIsAddCategoryModalOpen(true)}>Add Category</button>
            <AdminTable
                data={categories}
                columns={['_id', 'name', 'description']}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
            />

            <h3>Admins</h3>
            <button onClick={() => setIsAddAdminModalOpen(true)}>Add Admin</button>
            <AdminTable
                data={admins}
                columns={['_id', 'name']}
                onEdit={handleEditAdmin}
                onDelete={handleDeleteAdmin}
            />
            <h3>Deliveries</h3>
            <button onClick={() => setIsAddDeliveryModalOpen(true)}>Add Delivery</button>
            <AdminTable
                data={deliveries}
                columns={['_id', 'state', 'description']}
                onEdit={handleEditDelivery}
                onDelete={handleDeleteDelivery}
            />
            <h3>Packing States</h3>
            <button onClick={() => setIsAddPackingStateModalOpen(true)}>Add Packing State</button>
            <AdminTable
                data={packingStates}
                columns={['_id', 'state', 'description']}
                onEdit={handleEditPackingState}
                onDelete={handleDeletePackingState}
            />
            <h3>Order Status</h3>
            <AdminTable
                data={orderStatuses}
                columns={['_id', 'orderId', 'status', 'email']}
                onEdit={handleEditOrder}
                onDelete={handleDeleteStatus}
            />
            <button onClick={() => handleEditOrder()}> Add Order Status</button>

            {isEditModalOpen && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdateUser}
                />
            )}
            {isAddVendorModalOpen && (
                <AddVendorModal
                    onClose={() => setIsAddVendorModalOpen(false)}
                    onAdd={handleAddVendor}
                />
            )}
            {isAddCategoryModalOpen && (
                <AddCategoryModal
                    onClose={() => setIsAddCategoryModalOpen(false)}
                    onAdd={handleAddCategory}
                />
            )}
            {isAddAdminModalOpen && (
                <AddAdminModal
                    onClose={() => setIsAddAdminModalOpen(false)}
                    onAdd={handleAddAdmin}
                />
            )}
            {isAddDeliveryModalOpen && (
                <AddDeliveryModal
                    onClose={() => setIsAddDeliveryModalOpen(false)}
                    onAdd={handleAddDelivery}
                />
            )}
            {isAddPackingStateModalOpen && (
                <AddPackingStateModal
                    onClose={() => setIsAddPackingStateModalOpen(false)}
                    onAdd={handleAddPackingState}
                />
            )}

            {isEditAdminModalOpen && (
                <EditAdminModal
                    admin={selectedAdmin}
                    onClose={() => setIsEditAdminModalOpen(false)}
                    onUpdate={handleUpdateAdmin}
                />
            )}
            {isEditDeliveryModalOpen && (
                <EditDeliveryModal
                    delivery={selectedDelivery}
                    onClose={() => setIsEditDeliveryModalOpen(false)}
                    onUpdate={handleUpdateDelivery}
                />
            )}
            {isEditPackingStateModalOpen && (
                <EditPackingStateModal
                    packingState={selectedPackingState}
                    onClose={() => setIsEditPackingStateModalOpen(false)}
                    onUpdate={handleUpdatePackingState}
                />
            )}
            {isEditVendorModalOpen && (
                <EditVendorModal
                    vendor={selectedVendor}
                    onClose={() => setIsEditVendorModalOpen(false)}
                    onUpdate={handleUpdateVendor}
                />
            )}
            {isEditCategoryModalOpen && (
                <EditCategoryModal
                    category={selectedCategory}
                    onClose={() => setIsEditCategoryModalOpen(false)}
                    onUpdate={handleUpdateCategory}
                />
            )}
            {isUpdateStatusModalOpen && (
                <UpdateStatusModal
                    order={selectedOrder}
                    onClose={() => setIsUpdateStatusModalOpen(false)}
                    onUpdate={selectedOrder ? handleUpdateStatus : handleAddStatus}
                />
            )}
        </div>
    );
};

export default AdminPanel;