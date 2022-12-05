import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { expenseSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import { formatDate, getFilteredExpensesCategories } from "utils/utils";

interface AddExpenseModalProps {
  isOpen: boolean;
  handleToggle: () => void;
}

function AddExpenseModal({ isOpen, handleToggle }: AddExpenseModalProps) {
  const { actions } = useData();

  const filteredExpensesCategories = getFilteredExpensesCategories();

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
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
            haveCloseButton: true,
          }}
          schema={expenseSchema}
          handleToggle={handleToggle}
          defaultValues={{ date: formatDate(new Date().getTime()) }}
        >
          <Input type="date" label="Date" name="date" />

          <Select
            label="Category"
            name="category"
            options={filteredExpensesCategories}
            defaultValue={filteredExpensesCategories[0].value}
          />

          <Input label="Shop Name" name="shopName" />

          <Input type="number" step="0.01" label="Price" name="value" />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default AddExpenseModal;
