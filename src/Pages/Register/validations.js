const NAME_REGEX = /^[a-zA-Z]+$/;
const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

const validateName = (name) => {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return { isValid: false, message: "El campo no puede estar vacío." };
  }

  if (!NAME_REGEX.test(trimmedName)) {
    return {
      isValid: false,
      message: "Ingrese un nombre válido sin caracteres especiales.",
    };
  }

  return { isValid: true, message: "" };
};

const validateEmail = (email) => {
  if (email.trim() === "") {
    return {
      isValid: false,
      message: "El campo de correo electrónico no puede estar vacío.",
    };
  }

  return EMAIL_REGEX.test(email)
    ? { isValid: true, message: "" }
    : { isValid: false, message: "Formato de correo electrónico inválido." };
};

const validatePassword = (password, confirmPassword) => {
  if (password.trim() === "") {
    return {
      isValid: false,
      message: "El campo de contraseña no puede estar vacío.",
    };
  }

  if (!PWD_REGEX.test(password)) {
    return {
      isValid: false,
      message:
        "Las contraseñas deben contener entre 8 y 16 caracteres, contener números y letras mayúsculas y minúsculas.",
    };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Las contraseñas no coinciden." };
  }

  return { isValid: true, message: "" };
};

export default { validateName, validateEmail, validatePassword };
