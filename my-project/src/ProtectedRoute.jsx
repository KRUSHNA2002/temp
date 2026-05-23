import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  // login check
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // role check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;