import { Bar } from "react-chartjs-2";
import Card from "@/Atoms/Card";
import { generateOptionsBar } from "@/constants/chartsOptions";
import { useData } from "@/context/UserDataContext";
import { TimeRangeProps } from "types/chart.interface";
import { toCapital } from "utils/utils";
import styles from "./styles.module.scss";

interface BarChartWithLegendProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  legend: {
    label: string;
    value: number;
    percent: string;
    color: string;
  }[];
  timeRange: TimeRangeProps;
}

function BarChartWithLegend({
  chartData,
  legend,
  timeRange,
}: BarChartWithLegendProps) {
  const { userData } = useData();

  return (
    <div className={styles["block"]}>
      <Card title={`${toCapital(timeRange)}ly TOP expenses categories`}>
        <div className={styles["top-category"]}>
          <div className={styles["top-category__chart"]}>
            <Bar
              data={chartData}
              options={generateOptionsBar(userData.default_Currency, {
                indexAxis: "y",
                haveLegend: false,
              })}
              height={250}
            />
          </div>
          <div className={styles["top-category__chart__legend"]}>
            {legend.map((data) => (
              <div
                key={data.label}
                className={styles["top-category__chart__legend__container"]}
              >
                <div
                  className={styles["top-category__chart__legend__color"]}
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
  );
}

export default BarChartWithLegend;
