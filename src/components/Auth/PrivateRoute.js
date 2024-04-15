import React, { useContext } from 'react';
import { Outlet , Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
};