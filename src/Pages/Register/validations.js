const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

const validatePassword = (password) => {
  return PWD_REGEX.test(password);
};

export default { validateEmail, validatePassword };