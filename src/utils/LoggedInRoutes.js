import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInRoutes = () => {
  const user = useSelector((state) => state.user);
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default LoggedInRoutes;
