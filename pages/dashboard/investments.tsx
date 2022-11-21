import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardInvestments from "@/Organisms/DashboardInvestments";

const Income: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Investments",
        description: "Dashboard of investments",
      }}
    >
      <DashboardInvestments />
    </DashboardTemplate>
  );
};

export default Income;
