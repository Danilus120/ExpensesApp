import { useEffect, useState } from "react";
import { UserFirebaseI } from "types/user.interface";
import { formatDate } from "utils/utils";

export const useModal = () => {
  //   const [isModalOpened, setIsModalOpened] = useState(false);
  //   const [modalData, setModalData] = useState<Record<string, any>>({});

  //   const toggleModal = () => {
  //     setIsModalOpened((prev) => !prev);
  //   };

  //   const setEditData = (recordID: string) => {
  //     const data = userData.expenses.find((expense) => expense.id === recordID);

  //     if (!data) return;

  //     setModalData({ ...data, date: formatDate(data.date) });
  //   };

  //   useEffect(() => {
  //     if (Object.keys(modalData).length < 1) return;

  //     toggleModal();
  //   }, [modalData]);

  const [isModalOpened, setIsModalOpened] = useState(false);
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
