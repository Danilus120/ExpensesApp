import { useData } from "@/context/UserDataContext";
import React, { ChangeEvent, useEffect, useState } from "react";
import { calculateAvgSavingsFromLastMonths } from "utils/goals/utils";

function DashboardGoals() {
  const { userData } = useData();
  const [valueToSave, setValueToSave] = useState(0);
  const [monthsTimeRange, setMonthsTimeRange] = useState(2);
  const [avgSavings, setAvgSavings] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueToSave(Number(e.target.value));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthsTimeRange(Number(e.target.value));
  };

  useEffect(() => {
    setAvgSavings(
      calculateAvgSavingsFromLastMonths(valueToSave, userData, monthsTimeRange)
    );
  }, [monthsTimeRange, userData, valueToSave]);

  return (
    <>
      <input type="number" onChange={(e) => handleInputChange(e)} />
      <select name="" id="" onChange={(e) => handleSelectChange(e)}>
        <option value="1">1 month</option>
        <option value="3">3 months</option>
        <option value="6">6 months</option>
        <option value="12">12 months</option>
      </select>
      {avgSavings} months of savings
    </>
  );
}

export default DashboardGoals;
