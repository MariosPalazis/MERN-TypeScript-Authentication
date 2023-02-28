import React, { useState, createContext, useContext, useEffect } from "react";

// Create the context 

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

	 // Using the useState hook to keep track of the value authed (if a 
   // user is logged in)
   const sessionStorageValue = sessionStorage.getItem("loggedIn");

   const [authed, setAuthed] = useState<boolean>(Boolean(sessionStorageValue));

   const login = async (): Promise<void> => {
      const result = await fakeAsyncLogin();

      if (result) {
         console.log("user has logged in");

         setAuthed(true);
         sessionStorage.setItem("loggedIn", "true");
      }
   };

   const logout = async (): Promise<void> => {
      const result = await fakeAsyncLogout();

      if (result) {
         console.log("The User has logged out");
         setAuthed(false);
         sessionStorage.setItem("loggedIn", "false");
      }
   };

   /// Mock Async Login API call.
   // TODO: Replace with your actual login API Call code
   const fakeAsyncLogin = async (): Promise<string> => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve("Logged In");
         }, 300);
      });
   };

   // Mock Async Logout API call.
   // TODO: Replace with your actual logout API Call code
   const fakeAsyncLogout = async (): Promise<string> => {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve("The user has successfully logged on the server");
         }, 300);
      });
   };

   return (
      <AuthContext.Provider value={{ authed, setAuthed, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

// Finally creating the custom hook 
export const useAuth = () => useContext(AuthContext);