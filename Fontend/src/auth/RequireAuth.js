import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const RequireAuth = ({ children }) => {
  const { isUserLoggedIn, userData } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
