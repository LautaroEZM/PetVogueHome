import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { LinkNoDeco, YellowButton } from "../../styledComponents";
import toast, { Toaster } from "react-hot-toast";

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const isLoggedIn = users.length > 0 ? true : false;
  const userData = users[0].user;
  const isAdmin = userData.systemRole.includes("admin");
  console.log(isAdmin, "isAdmin");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setTimeout(() => toast.success("Has cerrado sesion"), 200);
  };

  return (
    <div className="profile">
      <Toaster position="top-center" />
      <div>
        <img src={userData.photo} alt="" />
        <h3>{userData.firstName}</h3>
        <h3>{userData.lastName}</h3>
        <h3>{userData.email}</h3>
        {isAdmin ? (
          <div>
            <LinkNoDeco to="/login">
              <YellowButton color="inherit" style={{ marginRight: "8px" }}>
                Dashboard
              </YellowButton>
            </LinkNoDeco>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        )}
      </div>
    </div>
  );
};

export default Perfil;
