import { useData } from "@/context/UserDataContext";
import React from "react";
import { ReminderI } from "types/user.interface";

import styles from "./styles.module.scss";

interface MobileReminderProps {
  reminder: ReminderI;
  setEditRecordID: (id: string) => void;
}

function MobileReminder({ reminder, setEditRecordID }: MobileReminderProps) {
  const { userData } = useData();

  const classes = `${styles["reminder__content"]} ${
    styles[`reminder__content--${reminder.color}`]
  }`;

  return (
    <div className={`${styles["reminder"]}`} key={reminder.id}>
      <div className={classes} onClick={() => setEditRecordID(reminder.id)}>
        <div className={`${styles["reminder__title"]}`}>{reminder.title}</div>
        <div className={`${styles["reminder__value"]}`}>
          {reminder.value} {userData.default_Currency}
        </div>
      </div>
    </div>
  );
}

export default MobileReminder;
