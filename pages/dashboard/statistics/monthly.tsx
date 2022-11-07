import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardStatisticsMonthly from "@/Organisms/DashboardStatistics/monthly";

const MonthlyStatistics: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Statistics",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatisticsMonthly />
    </DashboardLayout>
  );
};

export default MonthlyStatistics;
