import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

const EditOrder = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [vendorId, setVendorId] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchOrder();
        fetchVendors();
    }, []);
    const fetchVendors = async () => {
        setLoading(true)
        setError(null);
        try {
            const response = await api.get(`/user/vendors`);
            setVendors(response.data)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const fetchOrder = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/admin/orders/${id}`);
            setOrder(response.data);
            setVendorId(response.data.vendorId?._id || '');
            setStatus(response.data.status)
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
            await api.put(`/admin/orders/${id}`, { vendorId, status });
            navigate('/admin/orders');
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
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
        },
        {
            type: "select",
            name: "status",
            value: status,
            onChange: (e) => setStatus(e.target.value),
            options: [
                { value: 'pending', label: 'Pending' },
                { value: 'packing', label: 'Packing' },
                { value: 'dispatched', label: 'Dispatched' },
                { value: 'completed', label: 'Completed' }
            ],
            required: true
        }
    ]

    return (
        <Layout>
            <h1>Edit Order</h1>
            {loading && <div className='loading'>Updating order...</div>}
            {error && <div className='error'>{error}</div>}
            {!loading && !error && order &&
                <Form fields={fields} onSubmit={handleSubmit} submitLabel='Update' />
            }
        </Layout>
    );
};

export default EditOrder;