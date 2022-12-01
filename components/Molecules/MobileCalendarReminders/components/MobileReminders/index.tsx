import MobileReminder from "../MobileReminder";

import { ReminderI } from "types/user.interface";

import styles from "./styles.module.scss";

interface MobileRemindersProps {
  actualRemindersSortedByDates: {
    date: string;
    reminders: ReminderI[];
  }[];
  setEditRecordID: (id: string) => void;
}

function MobileReminders({
  actualRemindersSortedByDates,
  setEditRecordID,
}: MobileRemindersProps) {
  return (
    <div className={`${styles["reminders"]}`}>
      {actualRemindersSortedByDates.map((reminderWithDate) => {
        const { date, reminders } = reminderWithDate;
        return (
          <>
            <div key={date} className={`${styles["reminder__date"]}`}>
              {date}
            </div>
            {reminders.map((reminder) => (
              <MobileReminder
                key={reminder.id}
                reminder={reminder}
                setEditRecordID={setEditRecordID}
              />
            ))}
          </>
        );
      })}
    </div>
  );
}

export default MobileReminders;
