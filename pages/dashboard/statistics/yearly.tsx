import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardStatisticsYearly from "@/Organisms/DashboardStatistics/yearly";

const YearlyStatistics: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Statistics",
        description: "Dashboard of statistics",
      }}
    >
      <DashboardStatisticsYearly />
    </DashboardTemplate>
  );
};

export default YearlyStatistics;
