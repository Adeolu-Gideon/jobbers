/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import customFetch from "../../../utils/customFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

 useEffect(() => {
   const fetchUser = async () => {
     try {
       const response = await customFetch.get("/users/current-user");
       setUser(response.data.user);
       setIsAuthenticated(true);
     } catch (error) {
       setUser(null);
       setIsAuthenticated(false);
     } finally {
       setLoading(false);
     }
   };

   fetchUser();
 }, []);

//  Login
const login = async (userData) => {
  try {
    const response = await customFetch.post("/auth/login", userData);
    setUser(response.data.user);
    setIsAuthenticated(true);
  } catch (error) {
    setUser(null);
    setIsAuthenticated(false);
    throw error;
  }
};

//  Register
const register = async (userData) => {
  try {
    const response = await customFetch.post("/auth/register", userData);
    setUser(response.data.user);
    setIsAuthenticated(true);
  } catch (error) {
    setUser(null);
    setIsAuthenticated(false);
    throw error;
  }
};
  return (
    <AuthContext.Provider value={{ loading, isAuthenticated, user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
