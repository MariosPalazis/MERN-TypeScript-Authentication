import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import PublicRouter from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Landing from '../Pages/Landing';
import Login from '../Pages/Login';
import Error from '../Pages/Error';
import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';

interface RoutesHandlerProps {
   
}

const RoutesHandler: React.FC<RoutesHandlerProps> = () => {


    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={ <ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
                <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
                <Route path='*' element={<Error/>} />
            </Routes>
        </BrowserRouter>
        
    );
};

export default RoutesHandler;

/*
{
    isAuthenticated ? <Route path="/*" element={<ProtectedRoutes />} /> : <Route path="/*" element={<PublicRouter />} />
}
*/