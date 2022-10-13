import { ErrorMessage } from "@hookform/error-message";
import { FieldValues } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
}

const Input = ({
  type = "text",
  label,
  name,
  errors,
  register,
  ...rest
}: InputI) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name} className={styles["input-container__label"]}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={styles["input-container__input"]}
        {...register(name, { required: true, message: "is required" })}
        {...rest}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
};

export default Input;
