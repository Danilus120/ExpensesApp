import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import Table from "@/Molecules/Table";
import Button from "@/Atoms/Button";

import AddExpenseModal from "./components/AddExpenseModal";
import EditExpenseModal from "./components/EditExpenseModal";

import { useData } from "@/context/UserDataContext";

import { useModal } from "@/hooks/useModal";

import { expensesTableColumns } from "@/constants/tableColumns";
import { expensesCategories } from "@/constants/categories";

import styles from "./styles.module.scss";

function DashboardExpenses() {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const { userData, actions } = useData();
  const {
    isModalOpened: isEditExpenseModalOpened,
    toggleModal: toggleEditExpenseModal,
    modalRecordID,
    setRecordID,
  } = useModal();

  const toggleAddExpenseModal = () => {
    setIsAddExpenseModalOpen((prev) => !prev);
  };

  const formatedData = userData.expenses
    ? userData.expenses
        .sort((a, b) => b.date - a.date)
        .map((el) => {
          const categoryObj = expensesCategories.find(
            (category) => category.value === el.category
          );
          return {
            ...el,
            category: categoryObj?.label,
            date: new Date(el.date).toLocaleDateString("pl"),
          };
        })
    : [];

  return (
    <>
      <Table
        data={formatedData}
        defaultCurrency={userData.default_Currency}
        columns={expensesTableColumns}
        deleteRecordFn={actions.deleteExpense}
        editRecordFn={setRecordID}
        addFn={toggleAddExpenseModal}
        title="Expenses Table"
      />

      <AddExpenseModal
        handleToggle={toggleAddExpenseModal}
        isOpen={isAddExpenseModalOpen}
      />

      <EditExpenseModal
        handleToggle={toggleEditExpenseModal}
        isOpen={isEditExpenseModalOpened}
        id={modalRecordID}
      />
    </>
  );
}

export default DashboardExpenses;
