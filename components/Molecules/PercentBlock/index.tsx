import React from "react";
import { calculateComparisonPercent } from "utils/statistics/comparison";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { AiOutlineMinus } from "react-icons/ai";

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

  let isPositive =
    firstValue > secondValue
      ? "bigger"
      : firstValue === secondValue
      ? "equal"
      : "lower";

  let classes = `${styles["percent"]} ${
    isPositive === "bigger"
      ? styles["percent--positive"]
      : isPositive === "equal"
      ? styles["percent--equal"]
      : styles["percent--negative"]
  }`;

  if (reversly) {
    classes = `${styles["percent"]} ${
      isPositive === "lower"
        ? styles["percent--positive"]
        : isPositive === "equal"
        ? styles["percent--equal"]
        : styles["percent--negative"]
    }`;
  }

  return (
    <div className={classes}>
      <div className={styles["percent--value"]}>
        <div className={styles["percent--icon"]}>
          {isPositive === "bigger" ? (
            <ImArrowUp />
          ) : isPositive === "equal" ? (
            <AiOutlineMinus />
          ) : (
            <ImArrowDown />
          )}
        </div>
        <div className={styles["percent--number"]}>{percent}%</div>
      </div>
      <div className={styles["percent--time"]}>since {timeRange}</div>
    </div>
  );
}

export default PercentBlock;
