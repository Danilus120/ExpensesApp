import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardCharts from "@/Organisms/DashboardCharts";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Dashboard",
        description: "Dashboard of expenses app",
      }}
    >
      <DashboardCharts />
    </DashboardLayout>
  );
};

export default Dashboard;
