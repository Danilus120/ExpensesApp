import { useState } from "react";

export const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalData, setModalData] = useState({});

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const setEditData = (data: any) => {
    setModalData({ ...data });
  };

  return {
    isModalOpened,
    modalData,
    toggleModal,
    setEditData,
  };
};
