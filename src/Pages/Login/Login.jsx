import { gapi } from "gapi-script";
<<<<<<< HEAD
import { TextField, Button, Box, Link, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
//import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { createUser } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
=======
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
import { jwtDecode } from 'jwt-decode';

>>>>>>> 5b50b24244076371c65a10b9066b7206bbb2071b

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector(state => state.users);
  console.log(store, "store");

  const clientId = "1036674150575-20t738j12vau2ihteq06vv2r2s3e6p3t.apps.googleusercontent.com";
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

  const onSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    try {
      const userData = {
        email: decoded.email,
        firstName: decoded.name,
        photo: decoded.picture,
      };
  
      await dispatch(createUser(userData));

      // Redirige al usuario al componente de perfil
     //Descomentar luego  navigate('/perfil');
      console.log('Usuario creado:', userData);
    } catch (error) {
      console.error(`Error dispatching user data: ${error}`);
    }
    navigate("/");
    window.location.reload();
  };
  
  const onFailure = () => {
    console.log("Something went wrong");
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
          <div className="btn">
          <GoogleLogin
           onSuccess={onSuccess}
             onError={() => console.log('Login Failed')}
          />
          </div>
          
        </form>
      )}
    </div>
  );
}

export default Login;