import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

const CreateOrder = () => {
  const [vendorId, setVendorId] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1 }]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/user/vendors');
      setVendors(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/user/orders', { vendorId, items });
      navigate('/user/orders');
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const fields = [
    {
      type: "select",
      name: "vendorId",
      value: vendorId,
      onChange: (e) => setVendorId(e.target.value),
      options: vendors?.map(vendor => ({
        value: vendor._id, label: vendor.name
      })),
      required: true
    }
  ];

  return (
    <Layout>
      <h1>Create Order</h1>
      {loading && <div className='loading'>Creating Order...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error &&
        <Form fields={fields} onSubmit={handleSubmit} submitLabel='Create'>
          <h2>Order Items</h2>
          {items.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                min="1"
                required
              />
              {items.length > 1 && (
                <button type='button' onClick={() => handleRemoveItem(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type='button' onClick={handleAddItem}>Add Item</button>
        </Form>
      }
    </Layout>
  );
};

export default CreateOrder;