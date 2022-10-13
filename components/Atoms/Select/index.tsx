import ErrorMessage from "@/Atoms/ErrorMessage";
import { FieldValues } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  options: {
    label: string;
    value: string | number;
  }[];
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
        {...register(name, { required: true })}
        {...rest}
        className={styles["input-container__input"]}
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors[name] && <ErrorMessage text={errors[name].message} />}
    </div>
  );
}
