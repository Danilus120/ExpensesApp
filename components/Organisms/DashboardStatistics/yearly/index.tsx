import { useData } from "@/context/UserDataContext";

import {
  getExpensesChartData,
  getIncomeChartData,
  getYearComparisonData,
} from "utils/chartsUtils";

import Chart from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import { optionsBar, optionsPie } from "@/constants/chartsOptions";

Chart;

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const chartsData = {
    yearlyExpenses: getExpensesChartData(userData.expenses, "year"),
    yearlyIncome: getIncomeChartData(userData.income, "year"),
    comparison: getYearComparisonData(userData.expenses, userData.income),
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={`${styles["chart"]} ${styles["fullWidth"]}`}>
          <Card title="Comparison Expenses / Income" isBar={true}>
            <Bar data={chartsData.comparison} options={optionsBar} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Yearly expenses">
            <Pie data={chartsData.yearlyExpenses} options={optionsPie} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Yearly Income">
            <Pie data={chartsData.yearlyIncome} options={optionsPie} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card title="Yearly Investments">
            <Pie data={chartsData.yearlyExpenses} options={optionsPie} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
