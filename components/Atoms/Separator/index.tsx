import styles from "./styles.module.scss";

interface SeparatorI {
  text: string;
}

export default function Separator({ text }: SeparatorI) {
  return (
    <div className={styles["separator"]}>
      <span className={styles["separator__text"]}>{text}</span>
    </div>
  );
}
