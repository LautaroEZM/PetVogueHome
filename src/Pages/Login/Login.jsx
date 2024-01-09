import { TextField, Button, Box, Link } from "@mui/material";
import { useEffect, useState } from "react";
import {
  createUser,
  loginUser,
  logoutUser,
  setLoggedIn,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.users);
  console.log(store, "store");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password }));
      dispatch(setLoggedIn(true));
      navigate("/");
      navigate(0);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLoggedIn(false);
    setUser({});
    navigate("/");
    navigate(0);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="profile">
          <img src={user.imageUrl} alt="" />
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <h3>{user.email}</h3>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      ) : (
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              margin: "auto",
            }}
          >
            <TextField
              label="Correo electronico"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          <Box mt={2} mb={2}>
            <Link component={RouterLink} to="/register" variant="body2">
              ¿No estás registrado? Crea una cuenta
            </Link>
          </Box>
        </form>
      )}
    </div>
  );
}

export default Login;
