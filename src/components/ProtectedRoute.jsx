// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getToken, getRole } from "../utils/auth";

// /**
//  * @param {React.Component} children - The page/component to render
//  * @param {Array} roles - Allowed roles for this route
//  */
// const ProtectedRoute = ({ children, roles }) => {
//   const token = getToken();
//   const role = getRole();
// //   console.log("roleeeeeee",role)
// console.log("token:", token);
// console.log("role from getRole():", role);

//   if (!token) {
//     // Not logged in
//     return <Navigate to="/" replace />;
//   }

//   if (roles && !roles.includes(role)) {
//     if (role === "superAdmin") return <Navigate to="/superadmin/home" replace />;
//     if (role === "executive") return <Navigate to="/executive/home" replace />;
//     return <Navigate to="/home" replace />;
//     // Logged in but role not allowed
//     // return <Navigate to="/home" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const ProtectedRoute = ({ roles }) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(role)) {
    if (role === "superAdmin") return <Navigate to="/superadmin/home" replace />;
    if (role === "executive") return <Navigate to="/executive/home" replace />;
    return <Navigate to="/home" replace />;
  }

  return <Outlet />; // <-- This is key for nested routes
};

export default ProtectedRoute;