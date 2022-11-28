import { useModal } from "@/hooks/useModal";
import useWindowWidth from "@/hooks/useWindowWidth";
import CalendarReminders from "@/Molecules/CalendarReminders";
import { useState } from "react";
import AddReminderModal from "./components/AddReminderModal";
import EditReminderModal from "./components/EditReminderModal";

function DashboardReminders() {
  const width = useWindowWidth(20);

  const {
    isModalOpened: isEditModalOpened,
    modalRecordID: editRecordID,
    toggleModal: toggleEditModal,
    setRecordID: setEditRecordID,
  } = useModal();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddModalToggle = () => {
    setIsAddModalOpen((prev) => !prev);
  };

  return (
    <>
      {width < 768 ? (
        <p>mobile view of calendar</p>
      ) : (
        <CalendarReminders
          setEditRecordID={setEditRecordID}
          handleAddModalToggle={handleAddModalToggle}
        />
      )}

      <AddReminderModal
        isOpen={isAddModalOpen}
        handleToggle={handleAddModalToggle}
      />

      <EditReminderModal
        isOpen={isEditModalOpened}
        handleToggle={toggleEditModal}
        id={editRecordID}
      />
    </>
  );
}

export default DashboardReminders;
