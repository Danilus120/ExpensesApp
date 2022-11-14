import Card from "@/Atoms/Card";
import { expensesCategories, incomeCategories } from "@/constants/categories";
import { generateOptionsBar } from "@/constants/chartsOptions";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { Bar } from "react-chartjs-2";
import { TimeRangeProps } from "types/chart.interface";
import { getBarChartData } from "utils/charts/Bar/getBarChartData";
import { generateBarChartLegendData } from "utils/charts/Bar/legend";
import { toCapital } from "utils/utils";

import styles from "./styles.module.scss";

interface TopCategoriesProps {
  timeRange: TimeRangeProps;
}

function TopCategories({ timeRange }: TopCategoriesProps) {
  const { userData } = useData();

  const chartsData = {
    expenses: getBarChartData(userData.expenses, timeRange, expensesCategories),
    income: getBarChartData(userData.income, timeRange, incomeCategories),
  };

  const legends = {
    expenses: generateBarChartLegendData(chartsData.expenses, { sort: "dsc" }),
    income: generateBarChartLegendData(chartsData.income, { sort: "dsc" }),
  };

  return (
    <div className={styles["blocks"]}>
      <div className={styles["block"]}>
        <Card title={`${toCapital(timeRange)}ly TOP expenses categories`}>
          <div className={styles["topCategory"]}>
            <div className={styles["chart"]}>
              <Bar
                data={chartsData.expenses}
                options={generateOptionsBar(userData.default_Currency, {
                  indexAxis: "y",
                  haveLegend: false,
                })}
                height={250}
              />
            </div>
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
          </div>
        </Card>
      </div>
      <div className={styles["block"]}>
        <Card title={`${toCapital(timeRange)}ly TOP income categories`}>
          <div className={styles["topCategory"]}>
            <div className={styles["chart"]}>
              <Bar
                data={chartsData.income}
                options={generateOptionsBar(userData.default_Currency, {
                  indexAxis: "y",
                  haveLegend: false,
                })}
                height={250}
              />
            </div>
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
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TopCategories;
