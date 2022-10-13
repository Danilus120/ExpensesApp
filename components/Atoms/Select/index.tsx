import { ErrorMessage } from "@hookform/error-message";
import { FieldValues } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  options: Array<string>;
  type?: "text" | "password" | "email" | "number";
}

export default function Select({
  register,
  options,
  errors,
  label,
  name,
  ...rest
}: InputI) {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name} className={styles["input-container__label"]}>
        {label}{" "}
      </label>
      <select
        id={name}
        {...register(name, { required: true, message: "is required" })}
        {...rest}
        className={styles["input-container__input"]}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
}
