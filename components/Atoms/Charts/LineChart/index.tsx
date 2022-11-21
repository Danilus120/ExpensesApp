import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import Card from "@/Atoms/Card";
import styles from "./styles.module.scss";

ChartJS;

interface LineChartProps {
  title: string;
  chartData: any;
}

function LineChart({ title, chartData }: LineChartProps) {
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className={styles["chart"]}>
      <Card title={title}>
        <Line data={chartData} options={options} height={200} width={800} />
      </Card>
    </div>
  );
}

export default LineChart;
