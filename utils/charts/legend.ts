import { chartColors } from "@/constants/colors";

const generatePieChartLegendData = <
  T extends { datasets: { data: Array<number> }[]; labels: Array<string> }
>(
  chartData: T
) => {
  const { labels, datasets } = chartData;
  const { data } = datasets[0];

  const summaryOfDataValues = data.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const pieChartLegendData = labels
    .map((label, i) => {
      return {
        label: label,
        value: data[i],
        percent: Math.round((data[i] / summaryOfDataValues) * 100) + "%",
        color: chartColors[i],
      };
    })
    .filter((data) => data.value != 0);

  return pieChartLegendData;
};

export { generatePieChartLegendData };
