import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';

const Orders = () => {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
      setError(null);
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data);
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
  };

  const handleDelete = async (id) => {
      if(window.confirm("Are you sure want to delete this order?")){
        setLoading(true);
        setError(null);
        try {
             await api.delete(`/admin/orders/${id}`);
             fetchOrders();
           setLoading(false);
         } catch (error) {
             setError(error.message);
           setLoading(false);
       }
     }
  }

  return (
    <Layout>
        {loading && <div className='loading'>Loading orders...</div>}
            {error && <div className='error'>{error}</div>}
            {!loading && !error &&
        <div>
          <h1>Order List</h1>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>Vendor</th>
                <th>Items</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId.username}</td>
                   <td>{order.vendorId?.name || 'N/A'}</td>
                   <td>
                     <ul>
                        {order.items.map((item, index) => (
                           <li key={index}>
                              {item.name} - {item.quantity}
                           </li>
                         ))}
                       </ul>
                    </td>
                  <td>{order.status}</td>
                  <td>
                     <Link to={`/admin/orders/${order._id}/edit`}>Edit</Link> |
                    <button onClick={()=> {handleDelete(order._id)}}>Delete</button>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </Layout>
  );
};

export default Orders;