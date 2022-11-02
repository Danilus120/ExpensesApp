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
      {/* TODO: Component must load without reloading page with only route history */}
      <DashboardExpenses />
    </DashboardLayout>
  );
};

export default Dashboard;
