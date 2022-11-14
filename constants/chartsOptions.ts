import { Context } from "chartjs-plugin-datalabels";

const generateOptionsBar = (defaultCurrency: string) => {
  const optionsBar = {
    maintainAspectRatio: false,
    // responsive: true,
    color: "#8f8f8f",
    scales: {
      x: {
        grid: {
          color: "#555555",
        },
        ticks: {
          color: "#8f8f8f",
        },
      },
      y: {
        grid: {
          color: "#555555",
        },
        ticks: {
          color: "#8f8f8f",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue} ${defaultCurrency}`;
          },
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
        },
      },
    },
  };

  return optionsBar;
};

const generateOptionsPie = (data: any, defaultCurrency: string) => {
  const optionsPie = {
    color: "#8f8f8f",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value: any, ctx: Context) => {
          let datasets = ctx.chart.data.datasets;

          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a: any, b: any) => a + b, 0);
            const round = Math.round((value / sum) * 100);
            if (round < 5) {
              return null;
            }
            let percentage = Math.round((value / sum) * 100) + "%";
            return percentage;
          } else {
            return null;
          }
        },
        color: "white",
        fontSize: "16px",
      },
      tooltips: {
        mode: "label",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            let total = 0;
            data.datasets[0].data.forEach((num: number) => {
              total += num as number;
            });
            const currentValue = data.datasets[0].data[
              tooltipItem.dataIndex
            ] as number;

            const percentage = ((currentValue * 100) / total).toFixed(1) + "%";

            return `${currentValue} ${defaultCurrency} (${percentage})`;
          },
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
        },
      },
    },
  };

  return optionsPie;
};

export { generateOptionsBar, generateOptionsPie };
