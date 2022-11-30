import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";
import PastRemindersModal from "@/Molecules/PastRemindersModal";
import { Toaster } from "react-hot-toast";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";

interface ContentTemplateProps {
  children: React.ReactNode;
}

function ContentTemplate({ children }: ContentTemplateProps) {
  const { isSidepanelOpen, toggleSidepanel } = useSidepanel();

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

      <PastRemindersModal />
      <Toaster />
    </div>
  );
}

export default ContentTemplate;
