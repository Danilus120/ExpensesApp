import Button from "@/Atoms/Button";
import { isSameMonth } from "date-fns";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";

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
      <div className={`${styles["timeNavigation__month"]}`}>
        <Button variant="ghost" callbackFn={reset} size="small">
          {!isSameMonth(chosenDate, new Date()) && <BiRefresh />}
          <h3>
            {chosenDate.toLocaleDateString("en", {
              month: "long",
              year: "numeric",
            })}
          </h3>
        </Button>
      </div>
      <Button variant="ghost" iconOnly callbackFn={nextMonth}>
        <MdKeyboardArrowRight />
      </Button>
    </div>
  );
}

export default TimeNavigation;
