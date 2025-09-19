import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check auth on load
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(auth === "true");
  }, []);

  // login function
  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("google_token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
