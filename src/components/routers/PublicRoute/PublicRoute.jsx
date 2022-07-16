import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useAuthContext();
  //   if (loadingLogin) return <p>Cargando...</p>;
  if (user) return <Navigate to={"/home"} />;
  return <>{children}</>;
};

export default PublicRoute;
