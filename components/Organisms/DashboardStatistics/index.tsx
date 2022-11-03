import { useData } from "@/context/UserDataContext";
import React from "react";
import { getChartsDataFromExpenses } from "utils/utils";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardStatistics() {
  const { userData } = useData();

  const chartData = getChartsDataFromExpenses(userData.expenses);

  const data = {
    labels: chartData.map((data) => data.name),
    datasets: [
      {
        label: "Categories",
        data: chartData.map((data) => data.value),
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
      <Pie data={data} />
    </>
  );
}

export default DashboardStatistics;
