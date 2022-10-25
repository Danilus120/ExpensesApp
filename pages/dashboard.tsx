import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardExpenses from "@/Organisms/DashboardExpenses";

import { fakeExpensesData } from "@/constants/fakeDataForExpensesTable";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Dashboard",
        description: "Dashboard of expenses app",
      }}
    >
      <DashboardExpenses data={fakeExpensesData} />
    </DashboardLayout>
  );
};

export default Dashboard;
