import { Navigate } from "react-router-dom";

function ProtectedRoute({ component }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? component : <Navigate to="/login" />;
}

export default ProtectedRoute;
