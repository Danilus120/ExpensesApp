import { useData } from "@/context/UserDataContext";
import React, { useEffect, useState } from "react";
import { getChartsDataFromExpenses } from "utils/utils";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@/Atoms/Card";

import styles from "../styles.module.scss";
import { isSameMonth } from "date-fns";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#fff";

// https://stackoverflow.com/questions/19011861/is-there-a-float-input-type-in-html5

function DashboardStatisticsYearly() {
  const { userData } = useData();

  const expensesFromCurrMonth = userData.expenses.filter((expense) =>
    isSameMonth(expense.date, new Date())
  );

  const chartsData = {
    monthlyExpenses: getChartsDataFromExpenses(expensesFromCurrMonth),
  };

  // getChartData(chartsData.monthlyExpenses)
  const data = {
    labels: chartsData.monthlyExpenses.map((data) => data.name),
    datasets: [
      {
        label: "Categories",
        data: chartsData.monthlyExpenses.map((data) => data.value),
        color: "#fff",
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className={styles["charts"]}>
        <div className={styles["chart"]}>
          <Card title="Monthly expenses">
            <Pie data={data} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card>
            <Pie data={data} />
          </Card>
        </div>
        <div className={styles["chart"]}>
          <Card>
            <Pie data={data} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashboardStatisticsYearly;
