import { useData } from "@/context/UserDataContext";

import { getExpensesChartData, getIncomeChartData } from "utils/chartsUtils";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

function DashboardStatisticsWeekly() {
  const { userData } = useData();

  const chartsData = {
    weeklyExpenses: getExpensesChartData(userData.expenses, "week"),
    weeklyIncome: getIncomeChartData(userData.income, "week"),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["chart"]}>
          <Card title="Weekly expenses">
            <Pie data={chartsData.weeklyExpenses} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Weekly Income">
            <Pie data={chartsData.weeklyIncome} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Weekly Investments">
            <Pie data={chartsData.weeklyExpenses} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsWeekly;
