import Button from "@/Atoms/Button";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toCapital } from "utils/utils";

import styles from "./styles.module.scss";

interface CalendarNavigationProps {
  chosenDate: Date;
  handleAddModalToggle: () => void;
  actions: {
    prevMonth: () => void;
    nextMonth: () => void;
    reset: () => void;
  };
}

function CalendarNavigation({
  chosenDate,
  handleAddModalToggle,
  actions,
}: CalendarNavigationProps) {
  const calendarTitle = toCapital(
    chosenDate.toLocaleDateString("en", { month: "long", year: "numeric" })
  );

  return (
    <div className={styles["calendar__navigation"]}>
      <div className={styles["calendar__date"]}>
        <h3>{calendarTitle}</h3>
      </div>
      <div className={styles["calendar__buttons"]}>
        <Button variant="ghost" callbackFn={actions.prevMonth}>
          <MdKeyboardArrowLeft />
        </Button>
        <Button variant="ghost" callbackFn={actions.reset}>
          Actual month
        </Button>
        <Button variant="ghost" callbackFn={actions.nextMonth}>
          <MdKeyboardArrowRight />
        </Button>
      </div>
      <div className={styles["calendar__add-event"]}>
        <Button
          variant="contained"
          color="success"
          size="medium"
          callbackFn={handleAddModalToggle}
        >
          <FiPlus /> Add Reminder
        </Button>
      </div>
    </div>
  );
}

export default CalendarNavigation;
