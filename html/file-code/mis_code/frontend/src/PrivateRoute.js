import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children, roles, ...rest }) => {
  const { auth } = useContext(AuthContext);
  if (!auth || !roles.includes(auth.user.role)) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;