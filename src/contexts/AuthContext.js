import React, { createContext, useState, useEffect } from 'react';

//creating context for authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //check authentication from local storage
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  //handle signup
  const signup = (username, password) => {
    localStorage.setItem('user', JSON.stringify({ username, password })); //store details in local stprage
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
  };

  //handle user login
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    //checking credentails
    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
    } else {
      alert('Invalid credentials'); //alert if invalid credentials
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', false);
  };

  return (
    //provide the authentication state and functions to the rest of the application
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
