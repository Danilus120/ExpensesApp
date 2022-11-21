import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardExpenses from "@/Organisms/DashboardExpenses";

const Expenses: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Expenses",
        description: "Dashboard of expenses",
      }}
    >
      <DashboardExpenses />
    </DashboardTemplate>
  );
};

export default Expenses;
