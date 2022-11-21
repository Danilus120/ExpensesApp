import styles from "./styles.module.scss";

interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className={styles["separator"]}>
      <span className={styles["separator__text"]}>{text}</span>
    </div>
  );
}
