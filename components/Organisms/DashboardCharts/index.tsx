import LineChart from "@/Atoms/Charts/LineChart";
import DashboardMoneyCards from "./components/DashboardMoneyCards";
import TopCategories from "./components/TopCategories";
import TimeNavigation from "./components/TimeNavigation";
import { getLineMonthComparisonData } from "utils/charts/Line/line";
import { useData } from "@/context/UserDataContext";
import { useTimeNavigation } from "@/hooks/useTimeNavigation";

function DashboardCharts() {
  const { userData } = useData();
  const { chosenDate, actions } = useTimeNavigation();

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
