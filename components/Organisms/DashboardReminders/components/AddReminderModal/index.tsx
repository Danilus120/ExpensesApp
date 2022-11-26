import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { reminderAddSchema } from "@/constants/validationSchema";
import {
  calendarEventColors,
  recursiveEvents,
} from "@/constants/calendarConstants";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";

interface AddReminderModalProps {
  isOpen: boolean;
  handleToggle: () => void;
}

function AddReminderModal({ isOpen, handleToggle }: AddReminderModalProps) {
  const { actions } = useData();

  return (
    <>
      <Modal
        title="Add Reminder"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <Form
          onSubmit={(data) => {
            actions.addReminder(data);
            handleToggle();
          }}
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
          }}
          schema={reminderAddSchema}
          handleToggle={handleToggle}
        >
          <Input type="date" label="Date" name="date" />

          <Input label="Title" name="title" />

          <Input type="number" step="0.01" label="Value of Bill" name="value" />

          <Select
            label="Color Of Event"
            name="color"
            options={calendarEventColors}
            defaultValue={calendarEventColors[0].value}
          />

          <Select
            label="Recursive events"
            name="recursive"
            options={recursiveEvents}
            defaultValue={recursiveEvents[0].value}
          />

          <Input label="Description" name="description" />
        </Form>
      </Modal>
    </>
  );
}

export default AddReminderModal;
