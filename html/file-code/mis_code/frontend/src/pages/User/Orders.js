import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';

const UserOrders = () => {
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
      const response = await api.get('/user/orders');
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
         {!loading && !error &&
      <div>
        <h1>My Orders</h1>
        <Link to={'/user/orders/create'}>Create Order</Link>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
               <th>Vendor</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </Layout>
  );
};

export default UserOrders;