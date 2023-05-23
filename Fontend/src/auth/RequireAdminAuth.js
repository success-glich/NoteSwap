import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const RequireAdminAuth = ({ children }) => {
  const { isUserLoggedIn, userData } = useSelector((state) => state.user);
  const location = useLocation();
  console.log(isUserLoggedIn);
  console.log(userData.loggedInUser.role);
  console.log({ isUserLoggedIn });
  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  if (userData?.loggedInUser.role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  return children;
};

export default RequireAdminAuth;
