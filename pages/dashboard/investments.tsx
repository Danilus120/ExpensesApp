import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardInvestments from "@/Organisms/DashboardInvestments";

const Income: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Investments",
        description: "Dashboard of investments",
      }}
    >
      <DashboardInvestments />
    </DashboardLayout>
  );
};

export default Income;
