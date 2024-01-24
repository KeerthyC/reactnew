import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const sessionToken = sessionStorage.getItem('sessionToken');
    const sessionUser = sessionStorage.getItem('sessionUser');

    if (!sessionToken || sessionUser !== 'admin') {
        return <Navigate to="/adminheink" />;
    }

    return children;
};

export default ProtectedRoute;