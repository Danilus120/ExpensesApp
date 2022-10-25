import Button from "@/Atoms/Button";
import { expensesTableColumns } from "@/constants/tableColumns";
import { useData } from "@/context/UserDataContext";
import { useModal } from "@/hooks/useModal";
import Modal from "@/Molecules/Modal";
import Table from "@/Molecules/Table";
import React from "react";
import { useState } from "react";

import { FiPlus } from "react-icons/fi";
import AddExpenseModal from "./components/AddExpenseModal";

interface DashboardExpensesProps {
  data: {
    date: number;
    category: string;
    price: number;
    currency: string;
    description: string;
    shopName: string;
  }[];
}

function DashboardExpenses({ data }: DashboardExpensesProps) {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const { userData, actions } = useData();
  const { isModalOpened, toggleModal } = useModal();

  const toggleAddExpenseModal = () => {
    setIsAddExpenseModalOpen((prev) => !prev);
  };

  const formatedData = userData.expenses
    .sort((a, b) => b.date - a.date)
    .map((el: any) => {
      return {
        ...el,
        date: new Date(el.date).toLocaleDateString("pl"),
      };
    });

  return (
    <>
      <Button variant="ghost" iconOnly callbackFn={toggleAddExpenseModal}>
        <FiPlus />
      </Button>
      <Table
        data={formatedData}
        columns={expensesTableColumns}
        deleteRecordFn={actions.deleteExpense}
      />

      <AddExpenseModal
        handleToggle={toggleAddExpenseModal}
        isOpen={isAddExpenseModalOpen}
      />
    </>
  );
}

export default DashboardExpenses;
