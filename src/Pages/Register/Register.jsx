import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import validations from "./validations";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dni: "",
  });

  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [formData, isPasswordValid, touchedFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const validateForm = () => {
    const emailValid = touchedFields.email
      ? validations.validateEmail(formData.email)
      : true;

    const isPasswordValid =
      validations.validatePassword(formData.password) &&
      formData.password === formData.confirmPassword;

    const firstNameValidation = validations.validateName(formData.firstName);
    const lastNameValidation = validations.validateName(formData.lastName);

    setErrors({
      email: emailValid ? "" : "Formato de correo electrónico inválido",
      password:
        touchedFields.password && !isPasswordValid
          ? "Las contraseñas deben coincidir, deben contener entre 8 y 16 caracteres, contener números y letras mayúsculas y minúsculas."
          : "",
      firstName: firstNameValidation.message,
      lastName: lastNameValidation.message,
    });

    setIsSubmitDisabled(
      !(
        firstNameValidation.isValid &&
        lastNameValidation.isValid &&
        emailValid &&
        isPasswordValid
      )
    );
  };

  useEffect(() => {
    validateForm();
  }, [formData, touchedFields]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSubmitDisabled) {
      try {
        const newUser = await dispatch(createUser(formData));
        console.log("Registro exitoso:", newUser);
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Error al registrar usuario:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          label="Nombre *"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={touchedFields.firstName && !!errors.firstName}
          autoComplete="off"
        />
        <Typography variant="caption" color="error">
          {touchedFields.firstName && errors.firstName}
        </Typography>
        <TextField
          label="Apellido *"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={touchedFields.lastName && !!errors.lastName}
          autoComplete="off"
        />
        <Typography variant="caption" color="error">
          {touchedFields.lastName && errors.lastName}
        </Typography>
        <TextField
          label="Correo Electrónico *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={touchedFields.email && !!errors.email}
          autoComplete="off"
        />
        <Typography variant="caption" color="error">
          {touchedFields.email && errors.email}
        </Typography>
        <TextField
          label="Contraseña *"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={touchedFields.password && !!errors.password}
          autoComplete="off"
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
        <TextField
          label="Confirmar Contraseña *"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={touchedFields.password && !!errors.password}
          autoComplete="off"
        />
        <Typography variant="caption" color="error">
          {touchedFields.password && errors.password}
        </Typography>
        <TextField
          label="Teléfono (opcional)"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="off"
        />
        <TextField
          label="DNI (opcional)"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitDisabled}
        >
          Registrarse
        </Button>
        <Typography variant="body2">
          Ya tienes cuenta?{" "}
          <Link component={RouterLink} to="/login" color="primary">
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </form>
  );
}

export default Register;
