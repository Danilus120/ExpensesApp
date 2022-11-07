import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getYearComparisonData,
} from "utils/chartsUtils";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
ChartJS.defaults.color = "#fff";

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    yearlyExpenses: getExpensesChartData(userData.expenses, "year"),
    yearlyIncome: getIncomeChartData(userData.income, "year"),
    comparison: getYearComparisonData(userData.expenses, userData.income),
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["chart"]}>
          <Card title="Yearly expenses">
            <Pie data={chartsData.yearlyExpenses} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Yearly Income">
            <Pie data={chartsData.yearlyIncome} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Yearly Investments">
            <Pie data={chartsData.yearlyExpenses} />
          </Card>
        </div>
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <Card title="Comparison Expenses / Income">
            <Bar data={chartsData.comparison} options={options} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
