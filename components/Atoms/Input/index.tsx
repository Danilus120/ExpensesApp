import { FieldValues } from "react-hook-form";

import ErrorMessage from "@/Atoms/ErrorMessage";

import styles from "./styles.module.scss";
import { ChangeEvent, useEffect, useState } from "react";

interface InputI extends Partial<Pick<FieldValues, "register" | "errors">> {
  label: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "date";
  defaultValue?: string | number;
}

const Input = ({
  type = "text",
  label,
  name,
  errors,
  defaultValue = "",
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
        {...register(name, { required: true })}
        {...rest}
      />
      {errors[name] && <ErrorMessage text={errors[name].message} />}
    </div>
  );
};

export default Input;
