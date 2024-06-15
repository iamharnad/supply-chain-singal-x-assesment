import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  const signup = (username, password) => {
    localStorage.setItem('user', JSON.stringify({ username, password }));
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
  };

  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
