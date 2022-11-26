import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { expensesCategories } from "@/constants/categories";
import {
  expenseSchema,
  reminderAddSchema,
  reminderEditSchema,
} from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import { formatDate } from "utils/utils";
import Button from "@/Atoms/Button";

interface EditReminderModal {
  isOpen: boolean;
  handleToggle: () => void;
  id: string;
}

function EditReminderModal({
  isOpen,
  handleToggle,
  id: recordID,
}: EditReminderModal) {
  const { actions, userData } = useData();

  const dataFromRecord = userData.reminders.find(
    (reminder) => reminder.id === recordID
  );

  if (!dataFromRecord) return <></>;

  const data = { ...dataFromRecord, date: formatDate(dataFromRecord?.date!) };

  return (
    <>
      <Modal
        title="Edit Reminder"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <Form
          onSubmit={(data) => {
            actions.updateReminder(data.id, data);
            handleToggle();
          }}
          onDelete={(id: string) => {
            actions.deleteReminder(id);
            handleToggle();
          }}
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
            deleteRecordButton: true,
          }}
          schema={reminderEditSchema}
          handleToggle={handleToggle}
          defaultValues={data}
        >
          <Input label="Title" name="title" />

          <Input type="number" step="0.01" label="Price" name="value" />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default EditReminderModal;
