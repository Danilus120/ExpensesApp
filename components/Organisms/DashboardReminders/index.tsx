import Button from "@/Atoms/Button";
import { dayLabels } from "@/constants/calendarConstants";
import { useData } from "@/context/UserDataContext";
import { useCalendar } from "@/hooks/useCalendar";
import { useModal } from "@/hooks/useModal";
import { isSameDay, isSameMonth } from "date-fns";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toCapital } from "utils/utils";
import AddReminderModal from "./components/AddReminderModal";
import EditReminderModal from "./components/EditReminderModal";
import styles from "./styles.module.scss";

function DashboardReminders() {
  const { userData } = useData();
  const { days, chosenDate, actions } = useCalendar();
  const {
    isModalOpened: isEditModalOpened,
    modalRecordID: editRecordID,
    toggleModal: toggleEditModal,
    setRecordID: setEditRecordID,
  } = useModal();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const calendarTitle = toCapital(
    chosenDate.toLocaleDateString("pl", { month: "long", year: "numeric" })
  );

  const handleAddModalToggle = () => {
    setIsAddModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles["calendar"]}>
        <div className={styles["calendar__navigation"]}>
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
        </div>
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
      </div>

      <AddReminderModal
        isOpen={isAddModalOpen}
        handleToggle={handleAddModalToggle}
      />

      <EditReminderModal
        isOpen={isEditModalOpened}
        handleToggle={toggleEditModal}
        id={editRecordID}
      />
    </>
  );
}

export default DashboardReminders;
