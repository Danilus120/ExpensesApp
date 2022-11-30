import { useData } from "@/context/UserDataContext";
import React, { useState } from "react";
import {
  calculateAvgSavingsFromLastMonths,
  generateMonthOptionsForSelect,
} from "utils/goals/utils";

import styles from "./styles.module.scss";

function DashboardGoals() {
  const { userData } = useData();
  const [goalState, setGoalState] = useState({
    valueToSave: 0,
    monthsTimeRange: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setGoalState((prev) => {
      return {
        ...prev,
        [e.target.name]: Number(e.target.value),
      };
    });
  };

  const options = generateMonthOptionsForSelect(userData);

  const avgSavings = calculateAvgSavingsFromLastMonths(
    goalState.valueToSave,
    userData,
    goalState.monthsTimeRange
  );

  return (
    <div className={`${styles["goals"]}`}>
      <h3>Calculate time to achieve your goal</h3>
      <div className={`${styles["calculator"]}`}>
        <div className={`${styles["container"]}`}>
          <label htmlFor="valueToSave">
            The value of the target you want to achieve
          </label>
          <input
            type="number"
            name="valueToSave"
            id="valueToSave"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={`${styles["container"]}`}>
          <label htmlFor="monthsTimeRange">
            Over what period of time do you want to calculate the average
            savings?
          </label>
          <select
            name="monthsTimeRange"
            id="monthsTimeRange"
            onChange={(e) => handleChange(e)}
          >
            {options &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={`${styles["summary"]}`}>
        You will achieve your goal by {avgSavings} months
      </div>
    </div>
  );
}

export default DashboardGoals;
