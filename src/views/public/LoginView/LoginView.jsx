import React, { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";

const LoginView = () => {
  const { loginUs, loadingLogin } = useAuthContext();
  const [{ username, password }, setData] = useState({
    username: "",
    password: "",
  });
  const [messageError, setMessageError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        await loginUs(username, password);
      } catch (e) {
        setMessageError(e);
      }
    }
  };

  const handleChange = (e) => {
    setMessageError("");
    const { name, value } = e.target;
    setData({
      username: username,
      password: password,
      [name]: value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type={"text"}
          value={username}
          name="username"
          id="username"
          onChange={handleChange}
        />
      </div>
      <br />
      <br />
      <div>
        <label htmlFor="password">password: </label>
        <input
          type={"text"}
          value={password}
          name="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <br />
      <br />
      {!loadingLogin ? (
        <button type="submit">Acceder</button>
      ) : (
        <p>verificando usuario..</p>
      )}
      {messageError && <p style={{ color: "red" }}>{messageError}</p>}
    </form>
  );
};

export default LoginView;
