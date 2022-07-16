import React, { useState, useCallback, createContext } from "react";
import { login } from "../api/user";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const loginUs = useCallback(async (username, password) => {
    try {
      setLoadingLogin(true);
      const data = await login(username, password);
      setUser(data);
    } catch (e) {
      throw e;
    } finally {
      setLoadingLogin(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUs,
        loadingLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
