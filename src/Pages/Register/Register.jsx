import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import validations from "./validations";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dni: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm();
  };

  const validateForm = () => {
    const emailValid = validations.validateEmail(formData.email);
    const passwordValid = validations.validatePassword(formData.password);

    setErrors({
      email: emailValid ? "" : "Formato de correo electrónico inválido",
      password: passwordValid
        ? ""
        : "La contraseña debe tener entre 8 y 16 caracteres, incluyendo al menos un número y un carácter especial",
    });

    setIsSubmitDisabled(
      !(
        formData.firstName &&
        formData.lastName &&
        emailValid &&
        passwordValid &&
        formData.phone &&
        formData.dni
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar el formulario
    if (!isSubmitDisabled) {
      try {
        const newUser = await dispatch(createUser(formData));
        console.log("Registro exitoso:", newUser);
        navigate("/login");
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
          label="Nombre"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
        />
        <Typography variant="caption" color="error">
          {errors.email}
        </Typography>
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
        />
        <Typography variant="caption" color="error">
          {errors.password}
        </Typography>
        <TextField
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
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
