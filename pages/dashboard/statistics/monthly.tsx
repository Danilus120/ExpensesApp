import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardStatisticsMonthly from "@/Organisms/DashboardStatistics/monthly";

const MonthlyStatistics: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Statistics",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatisticsMonthly />
    </DashboardTemplate>
  );
};

export default MonthlyStatistics;
