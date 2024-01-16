const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

const validateNonEmpty = (value) => {
  return value.trim() !== '';
};

export { validateEmail, validateNonEmpty };