// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtectedRoute = ({ children }) => {
    const isAuthenticatedUser = isAuthenticated();

    return isAuthenticatedUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
