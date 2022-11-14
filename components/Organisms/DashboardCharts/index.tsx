import React from "react";

import DashboardMoneyCards from "./components/DashboardMoneyCards";
import LineChart from "@/Atoms/Charts/LineChart";
import { useData } from "@/context/UserDataContext";
import { getLineMonthComparisonData } from "utils/charts/Line/line";
import TopCategories from "./components/TopCategories";

function DashboardCharts() {
  const { userData } = useData();

  return (
    <>
      <DashboardMoneyCards />
      <LineChart
        title="Monthly Expenses / Income Comparison"
        chartData={getLineMonthComparisonData(
          userData.expenses,
          userData.income
        )}
      />
      <TopCategories timeRange="month" />
    </>
  );
}

export default DashboardCharts;
