import React from "react";

import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";

import { categories } from "@/constants/categories";
import { currency_list } from "@/constants/currencyList";
import { expenseSchema } from "@/constants/validationSchema";

import { useData } from "@/context/UserDataContext";

import { formatDate } from "utils/utils";

import { uuidv4 } from "@firebase/util";

interface AddExpenseModalProps {
  isOpen: boolean;
  handleToggle: () => void;
}

function AddExpenseModal({ isOpen, handleToggle }: AddExpenseModalProps) {
  const { userData, actions } = useData();

  return (
    <>
      <Modal
        title="Add Expense"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <Form
          onSubmit={(data) => {
            actions.addExpense(data);
            handleToggle();
          }}
          options={{ haveButtons: true, haveClearButton: true }}
          schema={expenseSchema}
          handleToggle={handleToggle}
        >
          <Input
            type="date"
            label="Date"
            name="date"
            defaultValue={formatDate(new Date().getTime())}
          />

          <Select
            label="Category"
            name="category"
            options={categories}
            defaultValue={categories[0].value}
          />

          <Input label="Shop Name" name="shopName" />

          <Input type="text" label="Price" name="price" />

          <Select
            label="Currency"
            name="currency"
            options={currency_list.map((currency) => {
              return {
                label: `${currency.name} (${currency.code})`,
                value: currency.code,
              };
            })}
            defaultValue={userData.default_Currency}
          />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default AddExpenseModal;
