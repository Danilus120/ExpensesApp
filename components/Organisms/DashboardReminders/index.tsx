import Button from "@/Atoms/Button";
import { dayLabels } from "@/constants/calendarConstants";
import { useCalendar } from "@/hooks/useCalendar";
import { isSameMonth } from "date-fns";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toCapital } from "utils/utils";
import styles from "./styles.module.scss";

function DashboardReminders() {
  const { days, chosenDate, actions } = useCalendar();

  const calendarTitle = toCapital(
    chosenDate.toLocaleDateString("pl", { month: "long", year: "numeric" })
  );

  return (
    <>
      <div className={styles["calendar"]}>
        <div className={styles["calendar__navigation"]}>
          <div className={styles["calendar__add-event"]}>
            <Button
              variant="contained"
              color="success"
              size="medium"
              callbackFn={() => {}}
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
                      <div className={styles["calendar__event"]}>
                        <p>Event #1 asdasdasdasdasdasd</p>
                      </div>
                      <div className={styles["calendar__event"]}>
                        <p>Event #1 asdasdasdasdasdasd</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardReminders;
