import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { incomeSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import { formatDate, getFilteredIncomesCategories } from "utils/utils";

interface AddIncomeModalProps {
  isOpen: boolean;
  handleToggle: () => void;
}

function AddIncomeModal({ isOpen, handleToggle }: AddIncomeModalProps) {
  const { actions } = useData();

  const filteredIncomesCategories = getFilteredIncomesCategories();

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
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
            haveCloseButton: true,
          }}
          schema={incomeSchema}
          handleToggle={handleToggle}
          defaultValues={{ date: formatDate(new Date().getTime()) }}
        >
          <Input type="date" label="Date" name="date" />

          <Select
            label="Category"
            name="category"
            options={filteredIncomesCategories}
            defaultValue={filteredIncomesCategories[0].value}
          />

          <Input label="Title" name="title" />

          <Input type="number" step="0.01" label="Income Value" name="value" />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default AddIncomeModal;
