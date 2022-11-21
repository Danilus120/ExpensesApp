import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardCharts from "@/Organisms/DashboardCharts";

const Dashboard: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Dashboard",
        description: "Dashboard of expenses app",
      }}
    >
      <DashboardCharts />
    </DashboardTemplate>
  );
};

export default Dashboard;
