import { gapi } from "gapi-script";
/* import { GoogleLogin, GoogleLogout } from 'react-google-login'; */
import { GoogleLogin } from '@react-oauth/google';
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
  const store = useSelector((state) => state.users);
  const navigate = useNavigate();
  console.log(store, "store");
  


  const clientId =
    "1036674150575-20t738j12vau2ihteq06vv2r2s3e6p3t.apps.googleusercontent.com";
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



  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientId,
      });
    };
    gapi.load("client:auth2", start);
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
      dispatch(setLoggedIn(true)); // Dispatch para actualizar el estado isLoggedIn
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLoggedIn(false);
    setUser({});
    navigate("/");
    window.location.reload();
  };
  const onSuccess = async (response) => {
    setUser(response.profileObj);

    // Hacer el dispatch a la base de datos con el email, el nombre y la foto
    try {
      const userData = {
        email: response.profileObj.email,
        firstName: response.profileObj.name,
        photo: response.profileObj.imageUrl,
      };

      await dispatch(createUser(userData));

      // Redirige al usuario al componente de perfil
      navigate('/perfil');
    } catch (error) {
      console.error(`Error dispatching user data: ${error}`);
    }
  };
  
  const onFailure = () => {
    console.log("Something went wrong");
  };

  // const handleLogout = () => {
  //   setUser({});
  //   console.log("User has logged out");
  // };

  return (
    <div className="App">
      {isLoggedIn ? (
        // Show user profile
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
        // Show login form
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
          <div className="btn">
            <GoogleLogin
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_policy"}
            />
          </div>
          
        </form>
      )}
    </div>
  );
}

export default Login;