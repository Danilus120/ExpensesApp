import styles from "./styles.module.scss";

interface ModalI {
  children: React.ReactNode;
  title: string;
  handleToggle: () => void;
  isOpened: boolean;
  size?: "small" | "medium" | "large";
}

// TODO: React Portal + initial focus

export default function Modal({
  children,
  title,
  handleToggle,
  isOpened,
  size = "medium",
}: ModalI) {
  return (
    <div className={`${styles["modal"]} ${isOpened && styles["show"]}`}>
      <div
        className={`${styles["modal__card"]} ${styles[`modal__card--${size}`]}`}
      >
        <div className={styles["modal__card__header"]}>
          <h2>{title}</h2>
        </div>
        <div className={styles["modal__card__content"]}>{children}</div>
      </div>
      <div className={styles["modal__background"]} onClick={handleToggle}></div>
    </div>
  );
}
