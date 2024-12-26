import React, { useState } from 'react';

const AuthForm = ({ formType, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    resetToken: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formType === 'signup' && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </>
      )}
      { (formType === 'signup' || formType === 'login') && (
        <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      )}
      {formType === 'forgetPassword' && (
        <input
          type="email"
          name="email"
          placeholder="Registered Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      )}
      {formType === 'resetPassword' && (
        <>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
            type="hidden"
            name="resetToken"
            value={formData.resetToken}
            onChange={handleChange}
          />
      </>
      )}

      <button type="submit">{formType.charAt(0).toUpperCase() + formType.slice(1)}</button>
    </form>
  );
};

export default AuthForm;