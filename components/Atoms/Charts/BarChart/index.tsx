import { Bar } from "react-chartjs-2";
import Card from "@/Atoms/Card";
import { generateOptionsBar } from "@/constants/chartsOptions";
import { useData } from "@/context/UserDataContext";

interface BarChartProps {
  chartData: any;
  title: string;
}

function BarChart({ chartData, title }: BarChartProps) {
  const { userData } = useData();

  return (
    <Card title={title}>
      <Bar
        data={chartData}
        options={generateOptionsBar(userData.default_Currency)}
        height={200}
      />
    </Card>
  );
}

export default BarChart;
