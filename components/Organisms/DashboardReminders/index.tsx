import Button from "@/Atoms/Button";
import { dayLabels } from "@/constants/calendarConstants";
import { useCalendar } from "@/hooks/useCalendar";
import { isSameMonth } from "date-fns";
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
          <div className={styles["calendar__date"]}>{calendarTitle}</div>
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
                      {cell.number}
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
