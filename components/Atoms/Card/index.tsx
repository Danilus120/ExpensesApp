import React from "react";

import styles from "./styles.module.scss";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  isBar?: boolean;
}

function Card({ children, title, isBar = false }: CardProps) {
  return (
    <div className={styles["card"]}>
      {title && <h4 className={styles["card__title"]}>{title}</h4>}
      {isBar ? (
        <div className={styles["bar__content"]}>{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

export default Card;
