import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Dashboard",
        description: "Dashboard of expenses app",
      }}
    >
      <p>asdasdas</p>
    </DashboardLayout>
  );
};

export default Dashboard;
