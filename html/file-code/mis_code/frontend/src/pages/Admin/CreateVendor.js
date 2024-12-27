import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

const CreateVendor = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/admin/vendors', { name, contact, address });
      navigate('/admin/vendors');
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

    const fields = [
        {
          type: "text",
            name: "name",
          placeholder: "Vendor Name",
            value: name,
            onChange: (e) => setName(e.target.value),
            required:true
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
      <h1>Create Vendor</h1>
      {loading && <div className='loading'>Creating vendor...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error &&
        <Form fields={fields} onSubmit={handleSubmit} submitLabel='Create' />
      }
    </Layout>
  );
};

export default CreateVendor;