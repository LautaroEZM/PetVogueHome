import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NotLoggedInRoutes = () => {
  const user = useSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default NotLoggedInRoutes
