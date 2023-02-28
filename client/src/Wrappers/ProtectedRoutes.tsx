import React from 'react';
import { Navigate } from "react-router-dom";
import { useGlobalContext } from './useUserContext';


const ProtectedRoutes = ({children}: any) => {
    const { user } = useGlobalContext()

    console.log(user.token)

    if (typeof user.token === 'undefined') {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoutes;