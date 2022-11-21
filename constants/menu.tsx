import { AiFillDashboard } from "react-icons/ai";
import { GiReceiveMoney, GiPayMoney, GiChart } from "react-icons/gi";

const expensesItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <AiFillDashboard />,
  },
  {
    name: "Expenses",
    link: "/dashboard/expenses",
    icon: <GiPayMoney />,
  },
  {
    name: "Income",
    link: "/dashboard/income",
    icon: <GiReceiveMoney />,
  },
  {
    name: "Investments",
    link: "/dashboard/investments",
    icon: <GiChart />,
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
