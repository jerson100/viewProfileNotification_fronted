const { useContext } = require("react");
const { AuthContext } = require("../providers/AuthProvider");

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No puede acceder a este contexto");
  return context;
};

export default useAuthContext;
