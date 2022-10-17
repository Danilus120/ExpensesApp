import ErrorMessage from "@/Atoms/ErrorMessage";
import { Controller, FieldValues } from "react-hook-form";

import AutoSelect from "react-select";

import styles from "./styles.module.scss";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
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
      {/* <select
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
      </select> */}
      <Controller
        control={}
        default_value={}
        name={}
        render={({ onChange, value, name, ref }) => (
          <AutoSelect
            inputRef={ref}
            options={options}
            id={name}
            className={styles["input-container__input"]}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val?.value)}
          />
        )}
      />

      {errors[name] && <ErrorMessage text={errors[name].message} />}
    </div>
  );
}
