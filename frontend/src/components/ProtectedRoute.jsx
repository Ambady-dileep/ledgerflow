// Wrap any route that should require login.
// If no token exists → redirect to /login (and remember where the user was going).
 
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/api";
 
export default function ProtectedRoute({ children }) {
  const location = useLocation();
 
  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  return children;
}
 