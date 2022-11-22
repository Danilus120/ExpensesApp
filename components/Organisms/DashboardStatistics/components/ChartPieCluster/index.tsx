import PieChart from "@/Atoms/Charts/PieChart";
import { expensesCategories, incomeCategories } from "@/constants/categories";
import { useData } from "@/context/UserDataContext";
import { getMonthComparisonData } from "utils/charts/Bar/comparison";
import {
  getInvestmentsPieChartData,
  getPieChartData,
} from "utils/charts/Pie/getPieChartData";
import { getSummaryChartData } from "utils/charts/Pie/summary";
import { checkIfChartDataIsNotEmpty, toCapital } from "utils/utils";
import styles from "./styles.module.scss";

interface ChartPieClusterProps {
  timeRange: "week" | "month" | "year";
}

function ChartPieCluster({ timeRange }: ChartPieClusterProps) {
  const { userData } = useData();
  const timeSpec = toCapital(timeRange);

  const chartsData = {
    expenses: getPieChartData(userData.expenses, timeRange, expensesCategories),
    income: getPieChartData(userData.income, timeRange, incomeCategories),
    investments: getInvestmentsPieChartData(userData.investments, timeRange),
    comparison: getMonthComparisonData(userData.expenses, userData.income),
    summary: getSummaryChartData(userData.expenses, userData.income, timeRange),
  };

  const isEmpty = {
    expenses: checkIfChartDataIsNotEmpty(chartsData.expenses),
    income: checkIfChartDataIsNotEmpty(chartsData.income),
    investments: checkIfChartDataIsNotEmpty(chartsData.investments),
    summary: checkIfChartDataIsNotEmpty(chartsData.summary),
  };

  return (
    <div className={styles["cluster"]}>
      {isEmpty.expenses ? (
        <PieChart
          title={`${timeSpec}ly Expenses`}
          chartData={chartsData.expenses}
        />
      ) : null}
      {isEmpty.income ? (
        <PieChart
          title={`${timeSpec}ly Income`}
          chartData={chartsData.income}
        />
      ) : null}
      {/* {isEmpty.investments ? (
        <PieChart
          title={`${timeSpec}ly Investments`}
          chartData={chartsData.investments}
        />
      ) : null} */}
      {isEmpty.summary ? (
        <PieChart
          title={`${timeSpec}ly Summary`}
          chartData={chartsData.summary}
        />
      ) : null}
    </div>
  );
}

export default ChartPieCluster;
