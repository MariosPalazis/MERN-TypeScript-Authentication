import React, { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios';
import { Credentials } from "../interfaces/global";

// Create the context 
interface StoredInfo{
   token: string,
   username: string
}
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

	 // Using the useState hook to keep track of the value authed (if a 
   // user is logged in)
   let parsedStorage = null;
   const sessionStorageValue = sessionStorage.getItem("token");
   if(sessionStorageValue !== null){
      parsedStorage = JSON.parse(sessionStorageValue);
   }

   const [stored, setStored] = useState<StoredInfo | null>(parsedStorage);

   const loginFromServer = async (credentials: Credentials): Promise<void> => {
      const result = await axios.post<any>('http://localhost:9000' + "/users/login" ,  credentials);

      if (result) {
         console.log("user has logged in");

         setStored(result.data);
         sessionStorage.setItem('token', JSON.stringify(result.data))
      }
      console.log(result);
   };

   const logout = async (): Promise<void> => {
      
   };

   return (
      <AuthContext.Provider value={{ stored, setStored , loginFromServer}}>
         {children}
      </AuthContext.Provider>
   );
};

// Finally creating the custom hook 
export const useAuth = () => useContext(AuthContext);