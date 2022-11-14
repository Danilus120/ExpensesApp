import Card from "@/Atoms/Card";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { TimeRangeProps } from "types/chart.interface";
import { getExpensesChartData } from "utils/charts/expenses";
import { getIncomeChartData } from "utils/charts/income";
import { generatePieChartLegendData } from "utils/charts/legend";
import { capitalizeFirstLetter } from "utils/utils";

import styles from "./styles.module.scss";

interface TopCategoriesProps {
  timeRange: TimeRangeProps;
}

function TopCategories({ timeRange }: TopCategoriesProps) {
  const { userData } = useData();

  const chartsData = {
    expenses: getExpensesChartData(userData.expenses, timeRange),
    income: getIncomeChartData(userData.income, timeRange),
  };

  const legends = {
    expenses: generatePieChartLegendData(chartsData.expenses, true),
    income: generatePieChartLegendData(chartsData.income, true),
  };

  return (
    <div className={styles["blocks"]}>
      <div className={styles["block"]}>
        <Card
          title={`${capitalizeFirstLetter(
            timeRange
          )}ly TOP expenses categories`}
        >
          <div className={styles["chart__legend"]}>
            {legends.expenses.map((data) => (
              <div
                key={data.label}
                className={styles["chart__legend__container"]}
              >
                <div
                  className={styles["chart__legend__color"]}
                  style={{ backgroundColor: data.color }}
                ></div>
                <p>
                  <span>{data.label}:</span> {data.value}{" "}
                  {userData.default_Currency} ({data.percent})
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className={styles["block"]}>
        <Card
          title={`${capitalizeFirstLetter(timeRange)}ly TOP income categories`}
        >
          <div className={styles["chart__legend"]}>
            {legends.income.map((data) => (
              <div
                key={data.label}
                className={styles["chart__legend__container"]}
              >
                <div
                  className={styles["chart__legend__color"]}
                  style={{ backgroundColor: data.color }}
                ></div>
                <p>
                  <span>{data.label}:</span> {data.value}{" "}
                  {userData.default_Currency} ({data.percent})
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TopCategories;
