import Button from "@/Atoms/Button";
import LoadingComponent from "@/Atoms/Loading";
import { useData } from "@/context/UserDataContext";
import { useModal } from "@/hooks/useModal";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { getCurrenciesExchange } from "services/currenciesAPI";
import ActiveInvestments from "./components/ActiveInvestments";
import AddInvestmentModal from "./components/AddInvestmentModal";
import EditInvestmentModal from "./components/EditInvestmentModal";
import WithdrawnInvestments from "./components/WithdrawnInvestments";

function DashboardInvestments() {
  const { userData } = useData();
  const {
    isModalOpened: isEditModalOpened,
    toggleModal: toggleEditModal,
    modalRecordID: modalEditRecordID,
    setRecordID: setEditRecordID,
  } = useModal();

  const [isLoading, setIsLoading] = useState(true);

  const [isAddInvestmentModalOpen, setIsAddInvestmentModalOpen] =
    useState(false);

  const [currenciesExchange, setCurrenciesExchange] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    getCurrenciesExchange(userData.default_Currency, setCurrenciesExchange);
  }, [userData.default_Currency]);

  useEffect(() => {
    if (Object.keys(currenciesExchange).length > 0) {
      setIsLoading(false);
    }
  }, [currenciesExchange]);

  const toggleAddInvestmentModal = () => {
    setIsAddInvestmentModalOpen((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingComponent color="#4E739E" />;
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        callbackFn={toggleAddInvestmentModal}
      >
        <FiPlus /> Add Investment
      </Button>

      <ActiveInvestments currenciesExchange={currenciesExchange} />

      <WithdrawnInvestments setEditID={setEditRecordID} />

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
