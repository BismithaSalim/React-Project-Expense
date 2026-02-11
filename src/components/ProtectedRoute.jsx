import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

/**
 * @param {React.Component} children - The page/component to render
 * @param {Array} roles - Allowed roles for this route
 */
const ProtectedRoute = ({ children, roles }) => {
  const token = getToken();
  const role = getRole();
//   console.log("roleeeeeee",role)

  if (!token) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(role)) {
    // Logged in but role not allowed
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;