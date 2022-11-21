import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { incomeCategories } from "@/constants/categories";
import { incomeSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import { formatDate } from "utils/utils";

interface EditIncomeModalProps {
  isOpen: boolean;
  handleToggle: () => void;
  id: string;
}

function EditIncomeModal({
  isOpen,
  handleToggle,
  id: recordID,
}: EditIncomeModalProps) {
  const { actions, userData } = useData();

  const dataFromRecord = userData.income.find(
    (income) => income.id === recordID
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
            actions.updateIncome(data.id, data);
            handleToggle();
          }}
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
          }}
          schema={incomeSchema}
          handleToggle={handleToggle}
          defaultValues={data}
        >
          <Input type="date" label="Date" name="date" />

          <Select
            label="Category"
            name="category"
            options={incomeCategories}
            defaultValue={data.category}
          />

          <Input label="Title" name="title" />

          <Input type="number" step="0.01" label="Income Value" name="value" />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default EditIncomeModal;
