import { FieldValues } from "react-hook-form";
import ErrorMessage from "@/Atoms/ErrorMessage";
import styles from "./styles.module.scss";

interface InputProps extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "date" | "hidden";
  defaultValue?: string | number;
  setValue?: any;
  step?: string;
}

const Input = ({
  type = "text",
  label,
  name,
  errors,
  defaultValue = "",
  register,
  setValue,
  step = "1",
  ...rest
}: InputProps) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name} className={styles["input-container__label"]}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={styles["input-container__input"]}
        {...register(name, { required: true })}
        {...rest}
        step={step}
      />
      {errors[name] && <ErrorMessage text={errors[name].message} />}
    </div>
  );
};

export default Input;
