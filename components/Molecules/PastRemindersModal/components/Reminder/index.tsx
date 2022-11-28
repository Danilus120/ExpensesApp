import Button from "@/Atoms/Button";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { ReminderI } from "types/user.interface";

import styles from "./styles.module.scss";

interface ReminderProps {
  reminder: ReminderI;
}

function Reminder({ reminder }: ReminderProps) {
  const { userData, actions } = useData();

  const formatedDate = new Date(reminder.date).toLocaleDateString("pl");

  return (
    <div className={styles["reminder"]}>
      <div className={`${styles["reminder__date"]}`}>{formatedDate}</div>
      <div className={`${styles["reminder__title"]}`}>{reminder.title}</div>
      <div className={`${styles["reminder__value"]}`}>
        {reminder.value} {userData.default_Currency}
      </div>
      <div className={`${styles["reminder__buttons"]}`}>
        <Button
          color="success"
          callbackFn={() => actions.addReminderExpense(reminder)}
        >
          Add expense
        </Button>
        <Button
          color="danger"
          callbackFn={() => actions.dismissReminder(reminder.id)}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
}

export default Reminder;
