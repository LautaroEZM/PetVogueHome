import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NotLoggedInRoutes = () => {
  const users = useSelector((state) => state.users);
  const isLoggedIn = users.length > 0 ? true : false;
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default NotLoggedInRoutes
