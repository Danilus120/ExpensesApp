import { FieldValues } from "react-hook-form";

import styles from "./styles.module.scss";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
}

const Input = ({ type = "text", label, name, register, ...rest }: InputI) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name} className={styles["input-container__label"]}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={styles["input-container__input"]}
        {...register(name)}
        {...rest}
      />
    </div>
  );
};

export default Input;
