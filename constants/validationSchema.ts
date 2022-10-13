import * as yup from "yup";

const settingsSchema = yup
  .object({
    currency: yup.string().required(),
    timezone: yup.string().required(),
  })
  .required();

export { settingsSchema };
