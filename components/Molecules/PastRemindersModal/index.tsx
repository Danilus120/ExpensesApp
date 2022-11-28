import Button from "@/Atoms/Button";
import { useData } from "@/context/UserDataContext";
import { isPast } from "date-fns";
import { useState } from "react";
import { ReminderI } from "types/user.interface";
import Modal from "../Modal";
import Reminder from "./components/Reminder";

import styles from "./styles.module.scss";

function PastRemindersModal() {
  const { userData, actions } = useData();

  const pastReminders = userData.reminders.filter(
    (reminder) => isPast(reminder.date) && reminder.notified === false
  );

  const [isOpen, setIsOpen] = useState(pastReminders.length > 0);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);

    pastReminders.forEach((reminder) => {
      actions.dismissReminder(reminder.id);
    });
  };

  return (
    <>
      {pastReminders.length > 0 ? (
        <Modal
          title="Are you payed for it already?"
          isOpened={isOpen}
          handleToggle={handleToggle}
        >
          <div className={styles["reminders"]}>
            {pastReminders.map((reminder) => (
              <Reminder key={reminder.id} reminder={reminder} />
            ))}
          </div>
          <div className={styles["buttons"]}>
            <Button color="error" callbackFn={handleToggle}>
              Close
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default PastRemindersModal;
