import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log(response.data.msg);
      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <AuthForm formType="signup" onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;