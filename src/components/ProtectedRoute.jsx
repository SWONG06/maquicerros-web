import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay usuario, redirigir
  if (!user || typeof user !== "object") {
    return <Navigate to="/login" replace />;
  }

  // Asegurar que children sea válido
  if (!children) {
    console.error("ProtectedRoute: children inválido");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
