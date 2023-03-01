import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./../hooks/useAuth";

// We are taking in the component that should be rendered if the user is authed
// We are also passing the rest of the props to the <Route /> component such as
// exact & the path
const ProtectedRoute = ({ children }:any) => {
	 // Getting the value from our cool custom hook
   const { stored } = useAuth();
   console.log(stored)
   if(!stored){
      return  <Navigate to={"/login"}  />
   }

   return children;
};

export default ProtectedRoute;