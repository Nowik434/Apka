import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';
import AppBarNav from './AppBar';
const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <><AppBarNav/><Outlet /></>;
};

export default ProtectedRoute;