import React from "react";
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
const Dashboard = () => {
  const location = useLocation();
  const pathName = location.pathname;
  // const {user}
  // const { userData, isUserLoggedIn } = useSelector((state) => state.user);
  const userData = { userType: "admin" };
  const isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    return <Navigate state={{ path: location.pathname }} to={`/login`} />;
  }
  if (pathName === "/dashboard") {
    return <h1> Dashboard</h1>;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default Dashboard;
