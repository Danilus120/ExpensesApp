import Card from "@/Atoms/Card";
import { useData } from "@/context/UserDataContext";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { generateOptionsPie } from "@/constants/chartsOptions";
import { generatePieChartLegendData } from "utils/chartLegendUtil";
import { IoIosArrowDown } from "react-icons/io";

import styles from "./styles.module.scss";

interface PieChartProps {
  chartData: any;
  title: string;
}

function PieChart({ chartData, title }: PieChartProps) {
  const { userData } = useData();
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const handleToggle = () => {
    setIsLegendOpen((prev) => !prev);
  };

  const pieChartExpensesLegendData = generatePieChartLegendData(chartData);

  return (
    <div className={`${styles["chart"]} ${isLegendOpen && styles["active"]}`}>
      <Card title={title}>
        <div className={styles["chart__container"]}>
          <div className={styles["chart__chart"]}>
            <Pie
              data={chartData}
              options={generateOptionsPie(chartData, userData.default_Currency)}
              plugins={[ChartDataLabels]}
              height={200}
              width={200}
            />
          </div>
          <div className={styles["chart__open"]} onClick={handleToggle}>
            <IoIosArrowDown />
          </div>
          {isLegendOpen ? (
            <div className={styles["chart__legend"]}>
              {pieChartExpensesLegendData.map((data) => (
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
          ) : null}
        </div>
      </Card>
    </div>
  );
}

export default PieChart;
