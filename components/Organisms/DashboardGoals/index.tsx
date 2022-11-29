import { useData } from "@/context/UserDataContext";
import React, { useEffect, useState } from "react";
import { calculateAvgSavingsFromLastMonths } from "utils/goals/utils";

import styles from "./styles.module.scss";

function DashboardGoals() {
  const { userData } = useData();
  const [avgSavings, setAvgSavings] = useState(0);
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

  useEffect(() => {
    setAvgSavings(
      calculateAvgSavingsFromLastMonths(
        goalState.valueToSave,
        userData,
        goalState.monthsTimeRange
      )
    );
  }, [goalState, userData]);

  return (
    <div className={`${styles["goals"]}`}>
      <h3>Calculate time to achieve your goal</h3>
      <div className={`${styles["calculator"]}`}>
        <div className={`${styles["container"]}`}>
          <label htmlFor="valueToSave">Value of your goal</label>
          <input
            type="number"
            name="valueToSave"
            id="valueToSave"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={`${styles["container"]}`}>
          <label htmlFor="monthsTimeRange">
            From how many months will be calculate avg.
          </label>
          <select
            name="monthsTimeRange"
            id="monthsTimeRange"
            onChange={(e) => handleChange(e)}
          >
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
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
