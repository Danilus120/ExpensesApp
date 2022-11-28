import { dayLabels } from "@/constants/calendarConstants";
import { useData } from "@/context/UserDataContext";
import { isSameDay, isSameMonth } from "date-fns";
import React from "react";

import styles from "./styles.module.scss";

interface CalendarContentProps {
  days: {
    timestamp: number;
    number: number;
  }[][];
  chosenDate: Date;
  setEditRecordID: (id: string) => void;
}

function CalendarContent({
  days,
  chosenDate,
  setEditRecordID,
}: CalendarContentProps) {
  const { userData } = useData();

  return (
    <div className={styles["calendar__content"]}>
      <div className={styles["calendar__days"]}>
        {dayLabels.map((day) => (
          <div key={day} className={styles["calendar__day"]}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles["calendar__rows"]}>
        {days.map((row, i) => (
          <div key={i} className={styles["calendar__row"]}>
            {row.map((cell) => {
              let classes = styles["calendar__cell"];

              if (isSameMonth(cell.timestamp, chosenDate)) {
                classes += ` ${styles["calendar__cell--active"]}`;
              }

              return (
                <div key={cell.timestamp} className={classes}>
                  <p>{cell.number}</p>
                  {userData.reminders.map((reminder) => {
                    if (!isSameDay(reminder.date, cell.timestamp)) return;

                    const classes = `${styles["calendar__event"]} ${
                      styles[`calendar__event--${reminder.color}`]
                    }`;

                    return (
                      <div
                        key={reminder.id}
                        className={classes}
                        onClick={() => setEditRecordID(reminder.id)}
                      >
                        <p>{reminder.title}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarContent;
