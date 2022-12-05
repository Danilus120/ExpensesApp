import DashboardNavigation from "@/Molecules/DashboardNavigation";
import DashboardSidePanel from "@/Molecules/DashboardSidePanel";
import PastRemindersModal from "@/Molecules/PastRemindersModal";
import { Toaster } from "react-hot-toast";

import useSidepanel from "@/hooks/useSidepanel";

import styles from "./styles.module.scss";
import { useData } from "@/context/UserDataContext";
import Modal from "@/Molecules/Modal";
import Form from "@/Molecules/Form";
import Select from "@/Atoms/Select";
import { currency_list } from "@/constants/currencyList";
import { useModal } from "@/hooks/useModal";
import { currencySchema } from "@/constants/validationSchema";

interface ContentTemplateProps {
  children: React.ReactNode;
}

function ContentTemplate({ children }: ContentTemplateProps) {
  const { userData, actions } = useData();
  const { isSidepanelOpen, toggleSidepanel } = useSidepanel();
  const { isModalOpened, toggleModal } = useModal(
    userData.default_Currency.length === 0
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

      <PastRemindersModal />
      <Toaster />

      <Modal
        title="Add your currency before start"
        handleToggle={() => {}}
        isOpened={isModalOpened}
      >
        <Form
          onSubmit={(data) => {
            actions.updateCurrency(data.currency);
            toggleModal();
          }}
          schema={currencySchema}
          handleToggle={toggleModal}
          options={{
            haveButtons: true,
            resetAfterSubmit: false,
            haveCloseButton: false,
          }}
        >
          <Select
            label="Default currency"
            name="currency"
            options={currency_list.map((currency) => {
              return {
                label: `${currency.name} (${currency.code})`,
                value: currency.code,
              };
            })}
            defaultValue={currency_list[0].code}
          />

          <input type="hidden" />
        </Form>
      </Modal>
    </div>
  );
}

export default ContentTemplate;
