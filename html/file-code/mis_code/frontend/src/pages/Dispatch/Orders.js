import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';

const DispatchOrders = () => {
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
      const response = await api.get('/dispatch/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <div className='loading'>Loading Orders...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error && (
        <div>
          <h1>Dispatch Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
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
                    <Link to={`/dispatch/orders/${order._id}/edit`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default DispatchOrders;