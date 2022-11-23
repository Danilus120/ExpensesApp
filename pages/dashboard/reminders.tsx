import type { NextPage } from "next";

import DashboardTemplate from "@/Templates/DashboardTemplate";
import DashboardReminders from "@/Organisms/DashboardReminders";

const Reminders: NextPage = () => {
  return (
    <DashboardTemplate
      metaOptions={{
        title: "Reminders",
        description: "Dashboard of reminders",
      }}
    >
      <DashboardReminders />
    </DashboardTemplate>
  );
};

export default Reminders;
