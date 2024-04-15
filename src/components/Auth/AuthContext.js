import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (userToken, userId) => {
    setToken(userToken);
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserId(null);
  };

  useEffect(() => {
    console.log(token);
    console.log(isLoggedIn);
    console.log(userId);
  }, [token, isLoggedIn]);

  return (
    <AuthContext.Provider value={{ token, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};