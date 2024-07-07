import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.account);

  if (user?.role != "ADMIN") return <Navigate to="/" />;

  return children;
};
export default AdminRoute;
