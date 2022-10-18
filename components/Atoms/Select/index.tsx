import AutoSelect from "react-select";
import { Control, Controller, FieldValues } from "react-hook-form";

import ErrorMessage from "@/Atoms/ErrorMessage";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";

interface InputI
  extends Partial<Pick<FieldValues, "register" | "errors" | "control">> {
  label: string;
  name: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export default function Select({
  options,
  errors,
  defaultValue = "",
  label,
  control,
  name,
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
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value, name, ref } }) => (
          // TODO: Repair Error
          <AutoSelect
            inputRef={ref}
            options={options}
            id={name}
            styles={customStyles}
            // className={styles["input-container__input"]}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val?.value)}
          />
        )}
      />

      {errors[name] && <ErrorMessage text={errors[name].message} />}
    </div>
  );
}
