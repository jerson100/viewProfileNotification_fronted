import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";

const PrivatePageLayout = () => {
  const { user } = useAuthContext();
  const [socket, setsocket] = useState(null);

  useEffect(() => {
    setsocket(io(process.env.REACT_APP_BACKEND_URL || "http://localhost:1560"));
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      socket?.emit("login", {
        user: user,
        room: socket.id,
      });
    });
    return () => {
      socket?.emit("disconnectedUser");
    };
  }, [socket]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>{<Outlet context={{ socket: socket }} />}</div>;
};

export default PrivatePageLayout;
