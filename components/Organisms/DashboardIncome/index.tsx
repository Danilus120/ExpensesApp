import { useState } from "react";
import Table from "@/Molecules/Table";
import AddIncomeModal from "./components/AddIncomeModal";
import EditIncomeModal from "./components/EditIncomeModal";
import { incomeTableColumns } from "@/constants/tableColumns";
import { incomeCategories } from "@/constants/categories";
import { useData } from "@/context/UserDataContext";
import { useModal } from "@/hooks/useModal";

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
    .map((el) => {
      const categoryObj = incomeCategories.find(
        (category) => category.value === el.category
      );

      return {
        ...el,
        category: categoryObj?.label,
        date: new Date(el.date).toLocaleDateString("pl"),
      };
    });

  return (
    <>
      <Table
        data={formatedData}
        defaultCurrency={userData.default_Currency}
        columns={incomeTableColumns}
        deleteRecordFn={actions.deleteIncome}
        editRecordFn={setRecordID}
        addFn={toggleAddIncomeModal}
        title="Income Table"
      />

      <AddIncomeModal
        handleToggle={toggleAddIncomeModal}
        isOpen={isAddIncomeModalOpen}
      />

      <EditIncomeModal
        handleToggle={toggleEditIncomeModal}
        isOpen={isEditIncomeModalOpened}
        id={modalRecordID}
      />
    </>
  );
}

export default DashboardIncome;
