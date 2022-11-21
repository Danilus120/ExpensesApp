import { addMonths } from "date-fns";
import { useState } from "react";

export const useTimeNavigation = () => {
  const [chosenDate, setChosenDate] = useState(new Date());

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

  return { chosenDate, actions };
};
