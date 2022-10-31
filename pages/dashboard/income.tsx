import type { NextPage } from "next";

import DashboardLayout from "@/Templates/DashboardTemplate";
import DashboardIncome from "@/Organisms/DashboardIncome";

const Income: NextPage = () => {
  return (
    <DashboardLayout
      metaOptions={{
        title: "Income",
        description: "Dashboard of income",
      }}
    >
      <DashboardIncome />
    </DashboardLayout>
  );
};

export default Income;
