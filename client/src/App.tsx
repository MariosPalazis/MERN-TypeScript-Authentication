import { useState } from 'react'
import RoutesHandler from './Wrappers/RoutesHandler'
import './App.css'
import { GlobalUserContent, MyGlobalUserContext, GlobalUser } from './Wrappers/useUserContext'
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
//import PublicRouter from "../PublicRoutes";
//import ProtectedRoutes from "../ProtectedRoutes";
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
function App() {

  return (
    <BrowserRouter >
      <AuthProvider>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='*' element={<Error/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
