import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
//Admin Routes
import AdminDashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import CreateUser from './pages/Admin/CreateUser';
import EditUser from './pages/Admin/EditUser';
import Vendors from './pages/Admin/Vendors';
import CreateVendor from './pages/Admin/CreateVendor';
import EditVendor from './pages/Admin/EditVendor';
import Orders from './pages/Admin/Orders';
import EditOrder from './pages/Admin/EditOrder';
// User Routes
import UserOrders from './pages/User/Orders';
import CreateOrder from './pages/User/CreateOrder';
// Packing routes
import PackingOrders from './pages/Packing/Orders';
import EditPackingOrder from './pages/Packing/EditOrder';
// dispatch routes
import DispatchOrders from './pages/Dispatch/Orders';
import EditDispatchOrder from './pages/Dispatch/EditOrder';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute roles={['admin']}><Users /></PrivateRoute>} />
          <Route path="/admin/users/create" element={<PrivateRoute roles={['admin']}><CreateUser /></PrivateRoute>} />
          <Route path="/admin/users/:id/edit" element={<PrivateRoute roles={['admin']}><EditUser /></PrivateRoute>} />
          <Route path="/admin/vendors" element={<PrivateRoute roles={['admin']}><Vendors /></PrivateRoute>} />
          <Route path="/admin/vendors/create" element={<PrivateRoute roles={['admin']}><CreateVendor /></PrivateRoute>} />
          <Route path="/admin/vendors/:id/edit" element={<PrivateRoute roles={['admin']}><EditVendor /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateRoute roles={['admin']}><Orders /></PrivateRoute>} />
          <Route path="/admin/orders/:id/edit" element={<PrivateRoute roles={['admin']}><EditOrder /></PrivateRoute>} />
          {/* User Routes */}
          <Route path="/user/orders" element={<PrivateRoute roles={['user']}><UserOrders /></PrivateRoute>} />
          <Route path="/user/orders/create" element={<PrivateRoute roles={['user']}><CreateOrder /></PrivateRoute>} />
          {/* Packing routes */}
          <Route path="/packing/orders" element={<PrivateRoute roles={['packing']}><PackingOrders /></PrivateRoute>} />
          <Route path="/packing/orders/:id/edit" element={<PrivateRoute roles={['packing']}><EditPackingOrder /></PrivateRoute>} />
          {/* Dispatch routes */}
          <Route path="/dispatch/orders" element={<PrivateRoute roles={['dispatch']}><DispatchOrders /></PrivateRoute>} />
          <Route path="/dispatch/orders/:id/edit" element={<PrivateRoute roles={['dispatch']}><EditDispatchOrder /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;