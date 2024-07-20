/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while checking auth state
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
