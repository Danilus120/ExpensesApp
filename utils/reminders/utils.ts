import { addDays, addMonths, addWeeks } from "date-fns";
import { ReminderI } from "types/user.interface";

const changeDateIfRecursive = (reminder: ReminderI) => {
  const reminderCopy = reminder;

  switch (reminder.recursive) {
    case "none":
      reminderCopy.notified = true;
      break;
    case "daily":
      reminderCopy.date = addDays(reminder.date, 1).getTime();
      break;
    case "weekly":
      reminderCopy.date = addWeeks(reminder.date, 1).getTime();
      break;
    case "monthly":
      reminderCopy.date = addMonths(reminder.date, 1).getTime();
      break;
    default:
      reminderCopy.notified = true;
      break;
  }

  return reminderCopy;
};

export { changeDateIfRecursive };
