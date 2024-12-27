import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

const EditDispatchOrder = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('packing');
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/dispatch/orders/${id}`);
      setOrder(response.data);
      setStatus(response.data.status);
      setRemarks(response.data.remarks || '');
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
      await api.put(`/dispatch/orders/${id}`, { status, remarks });
      navigate('/dispatch/orders');
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

    const fields = [
        {
            type:"select",
            name:"status",
            value: status,
            onChange: (e) => setStatus(e.target.value),
            options: [
                {value: 'packing', label: 'Packing'},
                {value: 'dispatched', label: 'Dispatched'},
            ],
            required: true,
        },
        {
            type:"text",
            name:"remarks",
            placeholder:"Remarks",
            value:remarks,
            onChange:(e)=> setRemarks(e.target.value)
        }
    ];

  return (
    <Layout>
      <h1>Edit Dispatch Order</h1>
      {loading && <div className='loading'>Updating Order...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error && order &&
      <Form fields={fields} onSubmit={handleSubmit} submitLabel='Update' />
      }
    </Layout>
  );
};

export default EditDispatchOrder;