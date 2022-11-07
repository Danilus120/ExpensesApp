import React from "react";

import styles from "./styles.module.scss";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  isBar?: boolean;
}

function Card({ children, title, isBar = false }: CardProps) {
  const classes = `${styles["card__content"]} ${
    isBar && styles["bar__content"]
  }`;

  return (
    <div className={styles["card"]}>
      {title && <h4 className={styles["card__title"]}>{title}</h4>}
      <div className={classes}>{children}</div>
    </div>
  );
}

export default Card;
