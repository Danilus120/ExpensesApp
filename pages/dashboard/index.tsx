import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardExpenses from "@/Organisms/DashboardExpenses";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Dashboard",
        description: "Dashboard of expenses app",
      }}
    >
      <DashboardExpenses />
    </DashboardLayout>
  );
};

export default Dashboard;
