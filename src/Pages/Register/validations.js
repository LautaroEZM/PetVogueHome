const NAME_REGEX = /^[a-zA-Z]+$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

const validateName = (name) => {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return { isValid: false, message: "El campo no puede estar vacío." };
  }

  if (!NAME_REGEX.test(trimmedName)) {
    return { isValid: false, message: "Ingrese un nombre válido sin caracteres especiales." };
  }

  return { isValid: true, message: "" };
};

const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

const validatePassword = (password) => {
  return PWD_REGEX.test(password);
};

export default { validateName, validateEmail, validatePassword };
