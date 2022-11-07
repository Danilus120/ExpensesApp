import { useData } from "@/context/UserDataContext";

import { getExpensesChartData, getIncomeChartData } from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";

Chart;

function DashboardStatisticsMonthly() {
  const { userData } = useData();

  const chartsData = {
    monthlyExpenses: getExpensesChartData(userData.expenses, "month"),
    monthlyIncome: getIncomeChartData(userData.income, "month"),
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
        <div className={styles["chart"]}>
          <Card title="Monthly expenses">
            <Pie data={chartsData.monthlyExpenses} options={optionsPie} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Monthly Income">
            <Pie data={chartsData.monthlyIncome} options={optionsPie} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Monthly Investments">
            <Pie data={chartsData.monthlyExpenses} options={optionsPie} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsMonthly;
