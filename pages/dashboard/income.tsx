import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";

const Income: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Income",
        description: "Dashboard of income",
      }}
    ></DashboardLayout>
  );
};

export default Income;
