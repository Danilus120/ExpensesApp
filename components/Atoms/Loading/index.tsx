import React from "react";
import ReactLoading from "react-loading";

import styles from "./styles.module.scss";

interface LoadingComponentProps {
  color: string;
}

function LoadingComponent({ color }: LoadingComponentProps) {
  return (
    <div className={styles["loading-wrapper"]}>
      <ReactLoading type="bubbles" color={color} />
    </div>
  );
}

export default LoadingComponent;
