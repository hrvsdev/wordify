import { validate } from "email-validator";

export const isNameShort = (name, errorSetter) => {
  if (name.trim().length < 3) {
    errorSetter(true);
    return true;
  }
  errorSetter(false)
  return false;
};

export const isEmailInvalid = (email, errorSetter) => {
  if (!validate(email)) {
    errorSetter(true);
    return true;
  }
  errorSetter(false)
  return false;
};

export const isPassWeak = (password, errorSetter) => {
  if (password.trim().length < 6) {
    errorSetter(true);
    return true;
  }
  errorSetter(false)
  return false;
};
