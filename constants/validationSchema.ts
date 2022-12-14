import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const validationObject = {
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
  email: yup.string().email().required(),
  displayName: yup.string().required(),
};

const settingsSchema = yup
  .object({
    timezone: yup.string().required(),
  })
  .required();

const currencySchema = yup
  .object({
    currency: yup.string().required(),
  })
  .required();

const expenseSchema = yup
  .object({
    date: yup.date().required(),
    category: yup.string().required(),
    value: yup.number().required(),
    // currency: yup.string().required(),
    descrtiption: yup.string(),
    shopName: yup.string().required(),
  })
  .required();

const incomeSchema = yup
  .object({
    date: yup.date().required(),
    category: yup.string().required(),
    title: yup.string().required(),
    value: yup.number().required(),
    // currency: yup.string().required(),
    descrtiption: yup.string(),
  })
  .required();

const investmentAddSchema = yup.object({
  name: yup.string().required(),
  value: yup.number().required(),
});

const investmentEditSchema = yup.object({
  payoutValue: yup.number().required(),
});

const reminderAddSchema = yup.object({
  date: yup.date().required(),
  title: yup.string().required(),
  value: yup.number().required(),
  color: yup.string().required(),
  recursive: yup.string().required(),
  descrtiption: yup.string(),
});

const reminderEditSchema = yup.object({
  title: yup.string().required(),
  value: yup.number().required(),
  descrtiption: yup.string(),
});

const loginFormSchema = yup
  .object({
    email: validationObject.email,
    password: validationObject.password,
  })
  .required();

const registerFormSchema = yup
  .object({
    displayName: validationObject.displayName,
    email: validationObject.email,
    password: validationObject.password,
  })
  .required();

const forgotPasswordSchema = yup
  .object({
    email: validationObject.email,
  })
  .required();

export {
  settingsSchema,
  currencySchema,
  expenseSchema,
  incomeSchema,
  investmentAddSchema,
  investmentEditSchema,
  reminderAddSchema,
  reminderEditSchema,
  loginFormSchema,
  registerFormSchema,
  forgotPasswordSchema,
};
