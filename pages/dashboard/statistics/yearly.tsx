import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardStatisticsYearly from "@/Organisms/DashboardStatistics/yearly";

const YearlyStatistics: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Statistics",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatisticsYearly />
    </DashboardLayout>
  );
};

export default YearlyStatistics;
