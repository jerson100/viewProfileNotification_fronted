import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

const PrivatePageLayout = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>{<Outlet />}</div>;
};

export default PrivatePageLayout;
