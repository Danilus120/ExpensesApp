import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";

import { useData } from "@/context/UserDataContext";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";
import { isPast } from "date-fns";
import Modal from "@/Molecules/Modal";
import { useState } from "react";
import Button from "@/Atoms/Button";

interface ContentTemplateProps {
  children: React.ReactNode;
}

function ContentTemplate({ children }: ContentTemplateProps) {
  const { userData, actions } = useData();
  const { isSidepanelOpen, toggleSidepanel } = useSidepanel();

  const pastReminders = userData.reminders.filter(
    (reminder) => isPast(reminder.date) && reminder.notified === false
  );

  const [isOpen, setIsOpen] = useState(pastReminders.length > 0);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    // set all past reminders to notified / change their date to next date
  };

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

      {pastReminders.length > 0 && (
        <Modal
          title="Are you payed for it already?"
          isOpened={isOpen}
          handleToggle={handleToggle}
        >
          <div className={styles["reminders"]}>
            {pastReminders.map((reminder) => {
              const formatedDate = new Date(reminder.date).toLocaleDateString(
                "pl"
              );
              return (
                <div key={reminder.id} className={styles["reminder"]}>
                  <div className={`${styles["reminder__date"]}`}>
                    {formatedDate}
                  </div>
                  <div className={`${styles["reminder__title"]}`}>
                    {reminder.title}
                  </div>
                  <div className={`${styles["reminder__value"]}`}>
                    {reminder.value} {userData.default_Currency}
                  </div>
                  <div className={`${styles["reminder__buttons"]}`}>
                    <Button
                      color="success"
                      callbackFn={() => actions.addReminderExpense(reminder)}
                    >
                      Add expense
                    </Button>
                    <Button
                      color="danger"
                      callbackFn={() => actions.dismissReminder(reminder.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles["buttons"]}>
            <Button color="error" callbackFn={handleToggle}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ContentTemplate;
