import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardStatistics from "@/Organisms/DashboardStatistics";

const Statistics: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Statistics",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatistics />
    </DashboardLayout>
  );
};

export default Statistics;
