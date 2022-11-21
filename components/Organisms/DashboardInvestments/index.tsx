import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import ActiveInvestments from "./components/ActiveInvestments";
import AddInvestmentModal from "./components/AddInvestmentModal";
import EditInvestmentModal from "./components/EditInvestmentModal";
import WithdrawnInvestments from "./components/WithdrawnInvestments";
import Button from "@/Atoms/Button";
import { getCurrenciesExchange } from "services/currenciesAPI";
import { useData } from "@/context/UserDataContext";
import { useModal } from "@/hooks/useModal";
import styles from "./styles.module.scss";

function DashboardInvestments() {
  const { userData } = useData();
  const {
    isModalOpened: isEditModalOpened,
    toggleModal: toggleEditModal,
    modalRecordID: modalEditRecordID,
    setRecordID: setEditRecordID,
  } = useModal();

  const [isAddInvestmentModalOpen, setIsAddInvestmentModalOpen] =
    useState(false);

  const [currenciesExchange, setCurrenciesExchange] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    getCurrenciesExchange(userData.default_Currency).then((value) => {
      setCurrenciesExchange(value);
    });
  }, [userData.default_Currency]);

  const toggleAddInvestmentModal = () => {
    setIsAddInvestmentModalOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        callbackFn={toggleAddInvestmentModal}
      >
        <FiPlus /> Add Investment
      </Button>

      <div className={styles["blocks"]}>
        <div className={styles["block"]}>
          <ActiveInvestments currenciesExchange={currenciesExchange} />
        </div>

        <div className={styles["block"]}>
          <WithdrawnInvestments setEditID={setEditRecordID} />
        </div>
      </div>

      <AddInvestmentModal
        handleToggle={toggleAddInvestmentModal}
        isOpen={isAddInvestmentModalOpen}
        currenciesExchange={currenciesExchange}
      />

      <EditInvestmentModal
        handleToggle={toggleEditModal}
        isOpen={isEditModalOpened}
        modalEditRecordID={modalEditRecordID}
      />
    </>
  );
}

export default DashboardInvestments;
