import React, { useState, useEffect } from "react";
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

  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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

    if (name === "password" || name === "confirmPassword") {
      setIsPasswordValid(
        validations.validatePassword(formData.password) &&
          formData.password === formData.confirmPassword
      );
    }
  };

  const validateForm = () => {
    const emailValid = touchedFields.email
      ? validations.validateEmail(formData.email)
      : true;

    setErrors({
      email: emailValid ? "" : "Formato de correo electrónico inválido",
      password:
        touchedFields.password && !isPasswordValid
          ? "Las contraseñas deben coincidir y cumplir con los requisitos"
          : "",
    });

    setIsSubmitDisabled(
      !(
        formData.firstName &&
        formData.lastName &&
        emailValid &&
        isPasswordValid &&
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
          autoComplete="off"
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="off"
        />
        <TextField
          label="Correo Electrónico"
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
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={touchedFields.password && !!errors.password}
          autoComplete="off"
        />
        <Typography variant="caption" color="error">
          {touchedFields.password && errors.password}
        </Typography>
        <TextField
          label="Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="off"
        />
        <TextField
          label="DNI"
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
