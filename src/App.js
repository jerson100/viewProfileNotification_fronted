import AppRouter from "./components/routers/AppRouter";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRouter />;
    </AuthProvider>
  );
}

export default App;
