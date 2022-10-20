import AutoSelect from "react-select";
import { Control, Controller, FieldValues } from "react-hook-form";

import ErrorMessage from "@/Atoms/ErrorMessage";

import { customStyles } from "./customStyles";
import styles from "./styles.module.scss";

interface InputI
  extends Partial<Pick<FieldValues, "register" | "errors" | "control">> {
  label: string;
  name: string;
  defaultValue?: any;
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
  console.log(errors);
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name} className={styles["input-container__label"]}>
        {label}
      </label>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value, name, ref } }) => (
          <AutoSelect
            ref={ref}
            options={options}
            id={name}
            styles={customStyles}
            value={options.find((c) => c.value === value)}
            onChange={(val) => onChange(val?.value)}
          />
        )}
      />
      {errors[name] && <ErrorMessage text={errors[name].message} />}
    </div>
  );
}
