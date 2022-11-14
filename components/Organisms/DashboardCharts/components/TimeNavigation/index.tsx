import Button from "@/Atoms/Button";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import styles from "./styles.module.scss";

interface TimeNavigationProps {
  chosenDate: Date;
  actions: {
    nextMonth: () => void;
    prevMonth: () => void;
    reset: () => void;
  };
}

function TimeNavigation({ chosenDate, actions }: TimeNavigationProps) {
  const { prevMonth, reset, nextMonth } = actions;

  return (
    <div className={styles["timeNavigation"]}>
      <Button variant="ghost" iconOnly callbackFn={prevMonth}>
        <MdKeyboardArrowLeft />
      </Button>
      <h3 onClick={reset}>
        {chosenDate.toLocaleDateString("en", {
          month: "long",
          year: "numeric",
        })}
      </h3>
      <Button variant="ghost" iconOnly callbackFn={nextMonth}>
        <MdKeyboardArrowRight />
      </Button>
    </div>
  );
}

export default TimeNavigation;
