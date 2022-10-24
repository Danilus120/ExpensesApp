import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import Table from "@/Molecules/Table";

import { fakeExpensesData } from "@/constants/fakeDataForExpensesTable";
import DashboardExpenses from "@/Organisms/DashboardExpenses";

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
