import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardExpenses from "@/Organisms/DashboardExpenses";

const Expenses: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Expenses",
        description: "Dashboard of expenses",
      }}
    >
      <DashboardExpenses />
    </DashboardLayout>
  );
};

export default Expenses;
