import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

const EditUser = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/admin/users/${id}`);
      setUsername(response.data.username);
      setRole(response.data.role);
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
      await api.put(`/admin/users/${id}`, { username, role });
      navigate('/admin/users');
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fields = [
    {
      type: "text",
      name: "username",
      placeholder: "Username",
      value: username,
      onChange: (e) => setUsername(e.target.value),
      required: true
    },
    {
      type: "select",
      name: "role",
      value: role,
      onChange: (e) => setRole(e.target.value),
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
        { value: "packing", label: "Packing" },
        { value: "dispatch", label: "Dispatch" },
      ],
      required: true,
    }
  ];

  return (
    <Layout>
      <h1>Edit User</h1>
      {loading && <div className='loading'>Updating user...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error &&
        <Form fields={fields} onSubmit={handleSubmit} submitLabel='Update' />
      }
    </Layout>
  );
};

export default EditUser;