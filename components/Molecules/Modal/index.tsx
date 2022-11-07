import ReactDOM from "react-dom";
import styles from "./styles.module.scss";

interface ModalI {
  children: React.ReactNode;
  title: string;
  handleToggle: () => void;
  isOpened: boolean;
  size?: "small" | "medium" | "large";
}

export default function Modal({
  children,
  title,
  handleToggle,
  isOpened,
  size = "medium",
}: ModalI) {
  // const modalContent = isOpened ? (
  //   <div className={`${styles["modal"]} ${isOpened && styles["show"]}`}>
  //     <div
  //       className={`${styles["modal__card"]} ${styles[`modal__card--${size}`]}`}
  //     >
  //       <div className={styles["modal__card__header"]}>
  //         <h2>{title}</h2>
  //       </div>
  //       <div className={styles["modal__card__content"]}>{children}</div>
  //     </div>
  //     <div className={styles["modal__background"]} onClick={handleToggle}></div>
  //   </div>
  // ) : null;

  const modalContent = (
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

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
}
