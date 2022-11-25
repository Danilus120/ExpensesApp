import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";

import { useData } from "@/context/UserDataContext";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";
import { isPast } from "date-fns";

interface ContentTemplateProps {
  children: React.ReactNode;
}

function ContentTemplate({ children }: ContentTemplateProps) {
  const { userData } = useData();
  const { isSidepanelOpen, toggleSidepanel } = useSidepanel();

  {
    /* TODO: Create modal reminder */
  }
  const pastReminders = userData.reminders.filter((reminder) =>
    isPast(reminder.date)
  );

  return (
    <div className={styles.main}>
      <div
        className={`${styles["sidepanel__container"]} ${
          isSidepanelOpen && styles["sidepanel__container--active"]
        }`}
      >
        <DashboardSidePanel
          isOpen={isSidepanelOpen}
          toggleSidepanel={toggleSidepanel}
        />
      </div>
      <div className={styles.container}>
        <DashboardNavigation toggleSidepanel={toggleSidepanel} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

export default ContentTemplate;
