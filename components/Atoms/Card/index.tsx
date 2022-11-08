import React from "react";

import styles from "./styles.module.scss";

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

function Card({ children, title }: CardProps) {
  return (
    <div className={styles["card"]}>
      {title && <h4 className={styles["card__title"]}>{title}</h4>}
      <div>{children}</div>
    </div>
  );
}

export default Card;
