import React from "react";
import { useParams } from "react-router-dom";

const UserProfileView = () => {
  const { username } = useParams();
  return <div>{`Estás en el perfil de: ${username}`}</div>;
};

export default UserProfileView;
