import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

const HomeView = () => {
  const { socket } = useOutletContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.on("getActiveUsers", (users) => {
        setUsers(users);
      });
      socket.on("activeUser", (newActiveUser) => {
        setUsers((prev) => [...prev, newActiveUser]);
      });
    }
  }, [socket]);
  return (
    <div>
      <h1>Usuarios activos: </h1>
      <ul>
        {users.map((i) => (
          <Link key={i.user._id} to={`/profile/${i.user.username}`}>
            {i.user.username}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomeView;
