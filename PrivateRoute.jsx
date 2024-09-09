import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const isAuthenticated = sessionStorage.getItem('logged') !== null;

  return isAuthenticated ? Element : <Navigate to="/login" />;
};

export default PrivateRoute;