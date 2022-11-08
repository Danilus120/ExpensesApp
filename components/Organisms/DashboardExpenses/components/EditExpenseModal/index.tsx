import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { categories } from "@/constants/categories";
import { currencySelectOptions, currency_list } from "@/constants/currencyList";
import { expenseSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import { uuidv4 } from "@firebase/util";
import React from "react";
import { DataActionTypes } from "@/context/userData/reducer/dataReducer.interface";

import styles from "./styles.module.scss";
import { formatDate } from "utils/utils";

interface EditExpenseModalProps {
  isOpen: boolean;
  handleToggle: () => void;
  id: string;
}

function EditExpenseModal({
  isOpen,
  handleToggle,
  id: recordID,
}: EditExpenseModalProps) {
  const { actions, userData } = useData();

  const dataFromRecord = userData.expenses.find(
    (expense) => expense.id === recordID
  );

  if (!dataFromRecord) return <></>;

  const data = { ...dataFromRecord, date: formatDate(dataFromRecord?.date!) };

  return (
    <>
      <Modal
        title="Edit Expense"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <Form
          onSubmit={(data) => {
            actions.updateExpense(data.id, data);
            handleToggle();
          }}
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
          }}
          schema={expenseSchema}
          handleToggle={handleToggle}
          defaultValues={data}
        >
          <Input type="date" label="Date" name="date" />

          <Select
            label="Category"
            name="category"
            options={categories}
            defaultValue={data.category}
          />

          <Input label="Shop Name" name="shopName" />

          <Input type="number" step="0.01" label="Price" name="value" />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default EditExpenseModal;
