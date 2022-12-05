import { useEffect, useState } from "react";

export const useModal = (isOpened = false) => {
  const [isModalOpened, setIsModalOpened] = useState(isOpened);
  const [modalRecordID, setModalRecordID] = useState<string>("");

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const setRecordID = (recordID: string) => {
    setModalRecordID(recordID);
    toggleModal();
  };

  // IMPORTANT: Working like unmount component to clear state
  useEffect(() => {
    if (isModalOpened === false) {
      setModalRecordID("");
    }
  }, [isModalOpened]);

  return {
    isModalOpened,
    modalRecordID,
    toggleModal,
    setRecordID,
  };
};
