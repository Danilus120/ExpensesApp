const optionsBar = {
  maintainAspectRatio: false,
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
};

const optionsPie = {
  color: "#8f8f8f",
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export { optionsBar, optionsPie };
