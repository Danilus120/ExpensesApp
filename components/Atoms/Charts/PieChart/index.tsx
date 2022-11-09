import Card from "@/Atoms/Card";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { generateOptionsPie } from "@/constants/chartsOptions";

interface PieChartProps {
  chartData: any;
  title: string;
}

function PieChart({ chartData, title }: PieChartProps) {
  const { userData } = useData();

  return (
    <Card title={title}>
      <Pie
        data={chartData}
        options={generateOptionsPie(chartData, userData.default_Currency)}
        plugins={[ChartDataLabels]}
        height={300}
        width={300}
      />
    </Card>
  );
}

export default PieChart;
