// TODO: ADD ICONS TO MENU

const expensesItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Expenses",
    link: "/dashboard/expenses",
  },
  {
    name: "Income",
    link: "/dashboard/income",
  },
  {
    name: "Investments",
    link: "/dashboard/investments",
  },
];

const statistics = [
  {
    name: "Weekly",
    link: "/dashboard/statistics/weekly",
  },
  {
    name: "Monthly",
    link: "/dashboard/statistics/monthly",
  },
  {
    name: "Yearly",
    link: "/dashboard/statistics/yearly",
  },
];

const accordionItems = [expensesItems];

export { accordionItems, expensesItems, statistics };
