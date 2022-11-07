import { useData } from "@/context/UserDataContext";

import { getExpensesChartData, getIncomeChartData } from "utils/chartsUtils";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    yearlyExpenses: getExpensesChartData(userData.expenses, "year"),
    yearlyIncome: getIncomeChartData(userData.income, "year"),
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
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
