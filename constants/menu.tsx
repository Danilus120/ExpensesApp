import { AiFillDashboard } from "react-icons/ai";
import { GiReceiveMoney, GiPayMoney, GiChart } from "react-icons/gi";
import { FiTarget } from "react-icons/fi";
import { FaChartArea } from "react-icons/fa";
import { BsCalendarPlus } from "react-icons/bs";

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
  {
    name: "Reminders",
    link: "/dashboard/reminders",
    icon: <BsCalendarPlus />,
  },
  {
    name: "Goals",
    link: "/dashboard/goals",
    icon: <FiTarget />,
  },
];

const statistics = {
  name: "Statistics",
  icon: <FaChartArea />,
  items: [
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
  ],
};

const accordionItems = [expensesItems];

export { accordionItems, expensesItems, statistics };
