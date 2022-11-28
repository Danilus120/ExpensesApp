import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardGoals from "@/Organisms/DashboardGoals";

const Expenses: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Goals",
        description: "Dashboard of goals",
      }}
    >
      <DashboardGoals />
    </DashboardTemplate>
  );
};

export default Expenses;
