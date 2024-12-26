import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const ForgetPassword = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/auth/forget-password', formData);
      console.log(response.data.msg);
      alert("Reset link sent to your email!");
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <AuthForm formType="forgetPassword" onSubmit={handleSubmit} />
    </div>
  );
};

export default ForgetPassword;