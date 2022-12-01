import Button from "@/Atoms/Button";
import { useData } from "@/context/UserDataContext";
import { isPast } from "date-fns";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { ReminderI } from "types/user.interface";
import { getActualRemindersByUniqueDates } from "utils/calendar/utils";
import MobileReminders from "./components/MobileReminders";

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

  const actualRemindersSortedByDates = getActualRemindersByUniqueDates(
    userData.reminders
  );

  return (
    <>
      <h3 className={styles["title"]}>Upcoming bills</h3>
      <Button color="success" callbackFn={handleAddModalToggle}>
        <FiPlus /> Add reminder
      </Button>

      <MobileReminders
        actualRemindersSortedByDates={actualRemindersSortedByDates}
        setEditRecordID={setEditRecordID}
      />
    </>
  );
}

export default MobileCalendarReminders;
