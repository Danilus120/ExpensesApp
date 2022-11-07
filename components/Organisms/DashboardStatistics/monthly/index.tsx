import { useData } from "@/context/UserDataContext";

import { getExpensesChartData, getIncomeChartData } from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import { optionsPie } from "@/constants/chartsOptions";

Chart;

function DashboardStatisticsMonthly() {
  const { userData } = useData();

  const chartsData = {
    monthlyExpenses: getExpensesChartData(userData.expenses, "month"),
    monthlyIncome: getIncomeChartData(userData.income, "month"),
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
