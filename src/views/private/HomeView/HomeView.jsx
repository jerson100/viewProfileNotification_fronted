import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

const HomeView = () => {
  const { user } = useAuthContext();
  const { socket } = useOutletContext();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.emit("getActiveUsers", user._id, (users) => {
        setUsers(users);
      });
      socket.on("newActiveUser", (newActiveUser) => {
        setUsers((prev) => [...prev, newActiveUser]);
      });
      socket.on("deletedActiveUser", (deletedUser) => {
        setUsers((prevUsers) =>
          prevUsers.filter((us) => deletedUser.room !== us.room)
        );
      });
    }
  }, [socket]);
  return (
    <div>
      <h1>Usuarios activos: </h1>
      <ul>
        {users.map((i) => (
          <li key={i.user._id}>
            <Link to={`/profile/${i.user.username}`}>{i.user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeView;
