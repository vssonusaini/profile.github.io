import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log(response.data.msg);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <AuthForm formType="login" onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;