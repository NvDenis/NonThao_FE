import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.account);

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default AuthRoute;
