import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const settingsSchema = yup
  .object({
    currency: yup.string().required(),
    timezone: yup.string().required(),
  })
  .required();

const loginFormSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(
        8,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "Password must contain at least 1 lower case letter")
      .minUppercase(1, "Password must contain at least 1 upper case letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 special character")
      .required(),
  })
  .required();

const registerFormSchema = yup
  .object({
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(
        8,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "Password must contain at least 1 lower case letter")
      .minUppercase(1, "Password must contain at least 1 upper case letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 special character")
      .required(),
  })
  .required();

const forgotPasswordSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export {
  settingsSchema,
  loginFormSchema,
  registerFormSchema,
  forgotPasswordSchema,
};
