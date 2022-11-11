import React from "react";
import { calculateComparisonPercent } from "utils/statistics/comparison";
import { ImArrowDown, ImArrowUp } from "react-icons/im";

import styles from "./styles.module.scss";

interface PercentBlockProps {
  firstValue: number;
  secondValue: number;
  timeRange: string;
  reversly?: boolean;
}

function PercentBlock({
  firstValue,
  secondValue,
  timeRange,
  reversly = false,
}: PercentBlockProps) {
  if (firstValue === 0 || secondValue === 0) return null;

  const percent = calculateComparisonPercent(firstValue, secondValue);

  let isPositive = firstValue > secondValue ? true : false;

  let classes = `${styles["percent"]} ${
    isPositive ? styles["percent--positive"] : styles["percent--negative"]
  }`;

  if (reversly) {
    classes = `${styles["percent"]} ${
      !isPositive ? styles["percent--positive"] : styles["percent--negative"]
    }`;
  }

  return (
    <div className={classes}>
      <div className={styles["percent--value"]}>
        <div className={styles["percent--icon"]}>
          {isPositive ? <ImArrowUp /> : <ImArrowDown />}
        </div>
        <div className={styles["percent--number"]}>{percent}%</div>
      </div>
      <div className={styles["percent--time"]}>since last {timeRange}</div>
    </div>
  );
}

export default PercentBlock;
