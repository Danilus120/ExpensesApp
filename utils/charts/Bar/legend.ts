import { chartColors } from "@/constants/colors";

const generateBarChartLegendData = <
  T extends { datasets: { data: Array<number> }[]; labels: Array<string> }
>(
  chartData: T,
  options: { sort: "asc" | "dsc" | false } = { sort: false }
) => {
  const { labels, datasets } = chartData;
  const { data } = datasets[0];

  const summaryOfDataValues = data.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  let barChartLegendData = labels
    .map((label, i) => {
      return {
        label: label,
        value: data[i],
        percent: Math.round((data[i] / summaryOfDataValues) * 100) + "%",
        color: chartColors[i],
      };
    })
    .filter((data) => data.value != 0);

  if (options.sort) {
    barChartLegendData =
      options.sort === "dsc"
        ? barChartLegendData.sort((a, b) => b.value - a.value)
        : barChartLegendData.sort((a, b) => a.value - b.value);
  }

  return barChartLegendData;
};

export { generateBarChartLegendData };
