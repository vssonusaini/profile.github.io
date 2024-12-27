import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';


const EditVendor = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
      setLoading(true);
        setError(null);
    try {
      const response = await api.get(`/admin/vendors/${id}`);
      setName(response.data.name);
      setContact(response.data.contact);
      setAddress(response.data.address);
        setLoading(false)
    } catch (error) {
      setError(error.message);
        setLoading(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
       setError(null);
    try {
      await api.put(`/admin/vendors/${id}`, { name, contact, address });
      navigate('/admin/vendors');
        setLoading(false)
    } catch (error) {
      setError(error.message);
        setLoading(false)
    }
  };

  const fields = [
    {
        type: "text",
        name: "name",
        placeholder: "Vendor Name",
        value: name,
        onChange: (e) => setName(e.target.value),
        required: true
    },
    {
        type: "text",
        name: "contact",
        placeholder: "Contact Number",
        value: contact,
        onChange: (e) => setContact(e.target.value),
    },
      {
        type: "text",
        name: "address",
        placeholder: "Address",
        value: address,
        onChange: (e) => setAddress(e.target.value),
    }
    ]

  return (
    <Layout>
      <h1>Edit Vendor</h1>
      {loading && <div className='loading'>Updating vendor...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error &&
          <Form fields={fields} onSubmit={handleSubmit} submitLabel='Update' />
      }
    </Layout>
  );
};

export default EditVendor;