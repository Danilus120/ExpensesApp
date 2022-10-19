import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import Table from "@/Molecules/Table";

import { fakeExpensesData } from "@/constants/fakeDataForExpensesTable";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Dashboard",
        description: "Dashboard of expenses app",
      }}
    >
      <Table
        data={fakeExpensesData.map((el) => {
          return { ...el, date: new Date(el.date).toLocaleDateString("pl") };
        })}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
