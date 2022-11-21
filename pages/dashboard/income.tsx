import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardIncome from "@/Organisms/DashboardIncome";

const Income: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Income",
        description: "Dashboard of income",
      }}
    >
      <DashboardIncome />
    </DashboardTemplate>
  );
};

export default Income;
