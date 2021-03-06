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
    const deletaus = (deletedUser) => {
      setUsers((prevUsers) =>
        prevUsers.filter((us) => {
          return deletedUser.room !== us.room;
        })
      );
    };

    const newActiveUs = (newActiveUser) => {
      setUsers((prev) => [...prev, newActiveUser]);
    };

    socket?.emit("getActiveUsers", user._id, (users) => {
      setUsers(users);
    });
    socket?.on("newActiveUser", newActiveUs);
    socket?.on("deletedActiveUser", deletaus);

    return () => {
      socket?.off("newActiveUser", newActiveUs);
      socket?.off("deletedActiveUser", deletaus);
    };
  }, [socket]);
  return (
    <>
      <section>
        <h1>Usuarios activos: </h1>
        <ul>
          {users.map((i) => (
            <li key={i.user._id}>
              <Link to={`/profile/${i.user.username}`}>{i.user.username}</Link>
            </li>
          ))}
        </ul>
        <br />
        <Link to={`/profile/${user.username}`}>Ver perfil</Link>
      </section>
    </>
  );
};

export default HomeView;
