import { gapi } from "gapi-script";
import { TextField, Button, Box, Link, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { createUser } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.users);
  console.log(store, "store");

  const clientId = "1036674150575-20t738j12vau2ihteq06vv2r2s3e6p3t.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de inicio de sesión con email y contraseña
    console.log("Email:", email);
    console.log("Password:", password);
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
    } catch (error) {
      console.error(`Error dispatching user data: ${error}`);
    }
  };

  const onFailure = () => {
    console.log("Something went wrong");
  };

  const handleLogout = () => {
    setUser({});
    console.log('User has logged out');
  };

  return (
    <div className="App">
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
          <TextField label="Correo electronico" type="email" value={email} onChange={handleEmailChange} />
          <TextField label="Contraseña" type="password" value={password} onChange={handlePasswordChange} />
        </Box>
      </form>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Iniciar Sesión
      </Button>

      {/* Enlace para registrarse */}
      <Box mt={2} mb={2}>
        <Link component={RouterLink} to="/register" variant="body2">
          ¿No estás registrado? Crea una cuenta
        </Link>
      </Box>

      {/* Botón de inicio de sesión con Google */}
      <div className="btn">
        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
        />
      </div>

      {/* Perfil del usuario */}
      <div className={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} alt="" />
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
        <h3>{user.googleId}</h3>
      </div>

      {/* Botón de cierre de sesión con Google */}
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        />
      </div>
    </div>
  );
}

export default Login;
