import Button from "@/Atoms/Button";
import Modal from "@/Molecules/Modal";
import Table from "@/Molecules/Table";
import React from "react";
import { useState } from "react";

import { FiPlus } from "react-icons/fi";
import AddExpenseModal from "./components";

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

  const toggleAddExpenseModal = () => {
    setIsAddExpenseModalOpen((prev) => !prev);
  };
  return (
    <>
      <Button variant="ghost" iconOnly callbackFn={toggleAddExpenseModal}>
        <FiPlus />
      </Button>
      <Table
        data={data.map((el) => {
          return { ...el, date: new Date(el.date).toLocaleDateString("pl") };
        })}
      />

      <AddExpenseModal
        handleToggle={toggleAddExpenseModal}
        isOpen={isAddExpenseModalOpen}
      />
    </>
  );
}

export default DashboardExpenses;
