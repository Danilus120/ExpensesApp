import Button from "@/Atoms/Button";
import { useData } from "@/context/UserDataContext";
import { isPast } from "date-fns";
import React from "react";
import { FiPlus } from "react-icons/fi";

import styles from "./styles.module.scss";

interface MobileCalendarRemindersProps {
  setEditRecordID: (id: string) => void;
  handleAddModalToggle: () => void;
}

function MobileCalendarReminders({
  setEditRecordID,
  handleAddModalToggle,
}: MobileCalendarRemindersProps) {
  const { userData } = useData();

  const actualReminders = userData.reminders
    .filter((reminder) => reminder.notified != true && !isPast(reminder.date))
    .sort((a, b) => a.date - b.date);

  return (
    <>
      <h3 className={styles["title"]}>Upcoming bills</h3>
      <Button color="success" callbackFn={handleAddModalToggle}>
        <FiPlus /> Add reminder
      </Button>
      <div className={`${styles["reminders"]}`}>
        {actualReminders.map((reminder) => {
          const classes = `${styles["reminder__content"]} ${
            styles[`reminder__content--${reminder.color}`]
          }`;

          return (
            <div className={`${styles["reminder"]}`} key={reminder.id}>
              <div className={`${styles["reminder__date"]}`}>
                {new Date(reminder.date).toLocaleDateString("pl", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div
                className={classes}
                onClick={() => setEditRecordID(reminder.id)}
              >
                <div className={`${styles["reminder__title"]}`}>
                  {reminder.title}
                </div>
                <div className={`${styles["reminder__value"]}`}>
                  {reminder.value} {userData.default_Currency}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MobileCalendarReminders;
