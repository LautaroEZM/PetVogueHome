import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { LinkNoDeco, YellowButton } from "../../styledComponents";
import toast, { Toaster } from "react-hot-toast";
import OrdersUser from "../OrdersUser/OrdersUser";
import styles from "./Perfil.module.css"

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isAdmin = user?.systemRole?.includes("admin");
  console.log(isAdmin, "isAdmin");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setTimeout(() => toast.success("Has cerrado sesion"), 200);
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      <div>
      <div className={styles.info}>
        <img src={user.photo} alt="" className={styles.img} />
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <h3>{user.email}</h3>
        </div>
       
        <OrdersUser/>

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
