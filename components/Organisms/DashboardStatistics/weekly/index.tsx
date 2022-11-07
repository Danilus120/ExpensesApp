import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getWeekComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";

Chart;

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    weeklyExpenses: getExpensesChartData(userData.expenses, "week"),
    weeklyIncome: getIncomeChartData(userData.income, "week"),
    comparison: getWeekComparisonData(userData.expenses, userData.income),
  };

  const optionsBar = {
    maintainAspectRatio: false,
    color: "#8f8f8f",
    scales: {
      x: {
        grid: {
          color: "#555555",
        },
        ticks: {
          color: "#8f8f8f",
        },
      },
      y: {
        grid: {
          color: "#555555",
        },
        ticks: {
          color: "#8f8f8f",
        },
      },
    },
  };

  const optionsPie = {
    color: "#8f8f8f",
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <Card title="Comparison Expenses / Income">
            <Bar data={chartsData.comparison} options={optionsBar} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Weekly expenses">
            <Pie data={chartsData.weeklyExpenses} options={optionsPie} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Weekly Income">
            <Pie data={chartsData.weeklyIncome} options={optionsPie} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Weekly Investments">
            <Pie data={chartsData.weeklyExpenses} options={optionsPie} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
