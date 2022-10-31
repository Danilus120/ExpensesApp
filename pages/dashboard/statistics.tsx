import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";

const Statistics: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Statistics",
        description: "Dashboard of statistics",
      }}
    ></DashboardLayout>
  );
};

export default Statistics;
