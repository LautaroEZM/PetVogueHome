import { gapi } from "gapi-script";
import { GoogleLogin } from "@react-oauth/google";
import { TextField, Button, Box, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { createUser, loginUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validateEmail, validateNonEmpty } from "./validations";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId =
    "1036674150575-20t738j12vau2ihteq06vv2r2s3e6p3t.apps.googleusercontent.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const user = useSelector((state) => state.user);

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
    const response = await dispatch(loginUser({ email, password }));
    try {
      if (response.error && response.error.response.status !== 200) {
        toast.error(response.error.response.data.error);
      } else {
        navigate("/");
        setTimeout(() => toast.success("Inicio de sesión exitoso"), 200);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    try {
      const userData = {
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        photo: decoded.picture,
      };
      await dispatch(createUser(userData));
      navigate("/");
      setTimeout(() => toast.success("Inicio de sesión exitoso"), 200);
    } catch (error) {
      console.error(`Error dispatching user data: ${error}`);
    }
  };

  const onFailure = () => {
    console.log("Something went wrong");
  };

  return (
    <div className="App">
      <Toaster position="top-center" />
      {user ? (
        <div>
          <h3>Bienvenido a PetVogue!</h3>
          <p>Estas siendo redirijido al inicio...</p>
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
              error={!validateEmail(email)}
              helperText={
                !validateEmail(email)
                  ? "Por favor, ingrese un correo electrónico válido."
                  : ""
              }
              onBlur={() =>
                setEmailValidation(
                  validateEmail(email) && validateNonEmpty(email)
                )
              }
            />
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                handlePasswordChange(e);
                setPasswordValidation(
                  validateNonEmpty(e.target.value) && e.target.value.length >= 8
                );
              }}
              error={!validateNonEmpty(password) || password.length < 8}
              helperText={
                !validateNonEmpty(password)
                  ? "Por favor, ingrese una contraseña."
                  : password.length < 8
                  ? "La contraseña debe tener al menos 8 caracteres."
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              disabled={!emailValidation || !passwordValidation}
            >
              Iniciar Sesión
            </Button>
          </Box>
          <Box mt={2} mb={2}>
            <Link component={RouterLink} to="/registrarse" variant="body2">
              ¿No estás registrado? Crea una cuenta
            </Link>
            <div className="btn">
              O bien, inicia sesion con tu cuenta de Google
              <GoogleLogin
                onSuccess={onSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </Box>
        </form>
      )}
    </div>
  );
}

export default Login;
