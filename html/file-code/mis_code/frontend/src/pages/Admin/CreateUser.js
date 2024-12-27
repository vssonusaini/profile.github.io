import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/admin/users', { username, password, role });
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
      type: "password",
      name: "password",
      placeholder: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
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
      <h1>Create User</h1>
      {loading && <div className='loading'>Creating user...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error &&
        <Form fields={fields} onSubmit={handleSubmit} submitLabel='Create' />
      }
    </Layout>
  );
};

export default CreateUser;