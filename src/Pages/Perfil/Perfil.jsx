import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {
  LinkNoDeco,
  ButtonTransparentMenu,
  YellowButton,
} from "../../styledComponents";

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const isLoggedIn = users.length > 0 ? true : false;
  const userData = users[0].user;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    // navigate(0);
  };

  return (
    <div className="profile">
      {isLoggedIn ? (
        <div>
          <img src={userData.photo} alt="" />
          <h3>{userData.firstName}</h3>
          <h3>{userData.lastName}</h3>
          <h3>{userData.email}</h3>
          <LinkNoDeco to="/Shop" >
          <ButtonTransparentMenu>Carrito</ButtonTransparentMenu>
          </LinkNoDeco>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      ) : (
        <LinkNoDeco to="/login">
          <YellowButton
            color="inherit"
            style={{ marginRight: "8px" }}
          >
            Iniciar Sesión
          </YellowButton>
        </LinkNoDeco>
      )}
    </div>
  );
};

export default Perfil;
