import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // try to load from localStorage so login persists on reload
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = (userData) => {
    // set user after successful login (userData can be token / profile)
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
