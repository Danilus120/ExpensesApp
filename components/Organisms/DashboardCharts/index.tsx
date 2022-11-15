import React from "react";

import DashboardMoneyCards from "./components/DashboardMoneyCards";
import LineChart from "@/Atoms/Charts/LineChart";
import { useData } from "@/context/UserDataContext";
import { getLineMonthComparisonData } from "utils/charts/Line/line";
import TopCategories from "./components/TopCategories";
import { useDate } from "@/hooks/useDate";

import TimeNavigation from "./components/TimeNavigation";

function DashboardCharts() {
  const { userData } = useData();
  // TODO: Change useDate() -> useTimeNavigation()
  const { chosenDate, actions } = useDate();

  return (
    <>
      <TimeNavigation chosenDate={chosenDate} actions={actions} />
      <DashboardMoneyCards chosenDate={chosenDate} />
      <LineChart
        title="Monthly Expenses / Income Comparison"
        chartData={getLineMonthComparisonData(
          userData.expenses,
          userData.income,
          chosenDate
        )}
      />
      <TopCategories timeRange="month" chosenDate={chosenDate} />
    </>
  );
}

export default DashboardCharts;
