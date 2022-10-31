import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import Table from "@/Molecules/Table";
import Button from "@/Atoms/Button";

import AddExpenseModal from "./components/AddIncomeModal";
import EditExpenseModal from "./components/EditIncomeModal";

import { useData } from "@/context/UserDataContext";

import { useModal } from "@/hooks/useModal";

import { expensesTableColumns } from "@/constants/tableColumns";

function DashboardIncome() {
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const { userData, actions } = useData();
  const {
    isModalOpened: isEditIncomeModalOpened,
    toggleModal: toggleEditIncomeModal,
    modalRecordID,
    setRecordID,
  } = useModal();

  const toggleAddIncomeModal = () => {
    setIsAddIncomeModalOpen((prev) => !prev);
  };

  const formatedData = userData.income
    .sort((a, b) => b.date - a.date)
    .map((el: any) => {
      return {
        ...el,
        date: new Date(el.date).toLocaleDateString("pl"),
      };
    });

  return (
    <>
      <Button variant="ghost" iconOnly callbackFn={toggleAddIncomeModal}>
        <FiPlus />
      </Button>
      <Table
        data={formatedData}
        columns={expensesTableColumns}
        deleteRecordFn={actions.deleteIncome}
        editRecordFn={setRecordID}
      />

      <AddExpenseModal
        handleToggle={toggleAddIncomeModal}
        isOpen={isAddIncomeModalOpen}
      />

      <EditExpenseModal
        handleToggle={toggleEditIncomeModal}
        isOpen={isEditIncomeModalOpened}
        id={modalRecordID}
      />
    </>
  );
}

export default DashboardIncome;
