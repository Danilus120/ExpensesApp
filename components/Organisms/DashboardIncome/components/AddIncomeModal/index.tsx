import React from "react";

import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";

import { currency_list } from "@/constants/currencyList";
import { incomeSchema } from "@/constants/validationSchema";

import { useData } from "@/context/UserDataContext";

import { formatDate } from "utils/utils";

import { uuidv4 } from "@firebase/util";

interface AddIncomeModalProps {
  isOpen: boolean;
  handleToggle: () => void;
}

function AddIncomeModal({ isOpen, handleToggle }: AddIncomeModalProps) {
  const { userData, actions } = useData();

  return (
    <>
      <Modal
        title="Add Income"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <Form
          onSubmit={(data) => {
            actions.addIncome(data);
            handleToggle();
          }}
          options={{ haveButtons: true, haveClearButton: true }}
          schema={incomeSchema}
          handleToggle={handleToggle}
        >
          <Input
            type="date"
            label="Date"
            name="date"
            defaultValue={formatDate(new Date().getTime())}
          />

          <Input label="Title" name="title" />

          <Input type="text" label="Income Value" name="income" />

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

export default AddIncomeModal;