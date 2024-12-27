import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
 import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { username, password });
        if (response.data && response.data.user) {
         login(response.data)
        if (response.data.user.role === 'admin') {
             navigate('/admin');
         } else if(response.data.user.role === 'user'){
             navigate('/user/orders')
         } else if (response.data.user.role === 'packing'){
            navigate('/packing/orders')
         } else if (response.data.user.role === 'dispatch') {
           navigate('/dispatch/orders')
         }

     } else {
      // Handle authentication failure
      console.log('Login failed')
    }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;