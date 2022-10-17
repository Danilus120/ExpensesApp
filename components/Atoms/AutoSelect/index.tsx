import React from "react";

import Select from "react-select";

import styles from "./styles.module.scss";

interface AutoSelectI {
  options: { value: string | number; label: string }[];
}

function AutoSelect(props: AutoSelectI) {
  return (
    <div className={styles["inputContainer"]}>
      <Select options={props.options} />
    </div>
  );
}

export default AutoSelect;
