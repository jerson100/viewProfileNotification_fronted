import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

const UserProfileView = () => {
  const { username } = useParams();
  const { user } = useAuthContext();
  const [visitedUsers, setVisitedUsers] = useState([]);
  const { socket } = useOutletContext();

  useEffect(() => {
    if (user.username !== username) {
      socket.emit("visitedProfile", user._id, username);
    } else {
      socket.emit("allVisitedUsers", user._id, (data) => {
        setVisitedUsers(data || []);
      });
      socket.on("addVisitedUser", (us) => {
        setVisitedUsers((prev) => [us, ...prev]);
      });
    }
  }, [socket, username, user._id, user.username, setVisitedUsers]);

  return (
    <>
      <h1>{`Estás en el perfil de: ${username}`}</h1>
      {user.username === username && (
        <section>
          <h1>Usuarios que visitaron mi perfil: </h1>
          {visitedUsers?.length < 1 ? (
            <p>Aún nadie ha visto tu perfil</p>
          ) : (
            <ul>
              {visitedUsers?.map((i) => {
                const dat = new Date(i.createdAt);
                return (
                  <li key={i._id}>
                    {`${
                      i.visitedUser.username
                    } ==> Fecha: ${dat.toLocaleString()}`}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </>
  );
};

export default UserProfileView;
