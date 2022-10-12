import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

interface InputI {
  options: {
    title: string;
    type?: string;
    id: string;
    value: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  options: { title, type = "text", id, value },
  handleChange,
}: InputI) {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id} className={styles["input-container__label"]}>
        {title}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={styles["input-container__input"]}
        onChange={handleChange}
        value={value}
        required
      />
    </div>
  );
}
