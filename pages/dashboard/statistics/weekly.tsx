import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardStatisticsWeekly from "@/Organisms/DashboardStatistics/weekly";

const WeeklyStatistics: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Statistics - weekly",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatisticsWeekly />
    </DashboardTemplate>
  );
};

export default WeeklyStatistics;
