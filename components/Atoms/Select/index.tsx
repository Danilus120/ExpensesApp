import { FieldValues } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  options: Array<string>;
  type?: "text" | "password" | "email" | "number";
}

export function Select({ register, options, label, name, ...rest }: InputI) {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name} className={styles["input-container__label"]}>
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        {...rest}
        className={styles["input-container__input"]}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
