import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardStatisticsWeekly from "@/Organisms/DashboardStatistics/weekly";

const WeeklyStatistics: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Statistics - weekly",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatisticsWeekly />
    </DashboardLayout>
  );
};

export default WeeklyStatistics;
