import { useCalendar } from "@/hooks/useCalendar";
import React from "react";
import CalendarContent from "./components/CalendarContent";
import CalendarNavigation from "./components/CalendarNavigation";

import styles from "./styles.module.scss";

interface CalendarRemindersProps {
  setEditRecordID: (id: string) => void;
  handleAddModalToggle: () => void;
}

function CalendarReminders({
  setEditRecordID,
  handleAddModalToggle,
}: CalendarRemindersProps) {
  const { days, chosenDate, actions } = useCalendar();

  return (
    <div className={styles["calendar"]}>
      <CalendarNavigation
        handleAddModalToggle={handleAddModalToggle}
        chosenDate={chosenDate}
        actions={actions}
      />
      <CalendarContent
        days={days}
        chosenDate={chosenDate}
        setEditRecordID={setEditRecordID}
      />
    </div>
  );
}

export default CalendarReminders;
