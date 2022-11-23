import { addMonths } from "date-fns";
import { useEffect, useState } from "react";
import { createFormatedMonthDays } from "utils/calendar/utils";

export const useCalendar = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [days, setDays] = useState<{ timestamp: number; number: number }[][]>(
    createFormatedMonthDays(chosenDate)
  );

  useEffect(() => {
    setDays(createFormatedMonthDays(chosenDate));
  }, [chosenDate]);

  const nextMonth = () => {
    setChosenDate((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setChosenDate((prev) => addMonths(prev, -1));
  };

  const reset = () => {
    setChosenDate(new Date());
  };

  const actions = {
    nextMonth,
    prevMonth,
    reset,
  };

  return {
    days,
    chosenDate,
    actions,
  };
};
