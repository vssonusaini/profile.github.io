import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    try {
        const storedAuth = localStorage.getItem('auth');
        if(storedAuth){
            setAuth(JSON.parse(storedAuth));
        }
      } catch (error) {
         console.error('Error parsing stored auth',error)
      }
  }, []);

    const login = (auth) =>{
        localStorage.setItem('auth', JSON.stringify(auth));
        setAuth(auth)
    }

    const logout = () => {
        localStorage.removeItem('auth');
        setAuth(null);
    };


  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};