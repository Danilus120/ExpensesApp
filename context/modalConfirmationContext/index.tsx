import Button from "@/Atoms/Button";
import { useModalShow } from "@/hooks/useShowModal";
import Modal from "@/Molecules/Modal";
import React, { useContext, useRef, useState } from "react";
import styles from "./styles.module.scss";

type ModalContextType = {
  showConfirmation: (
    title: string,
    message: string | JSX.Element
  ) => Promise<boolean>;
};

type ConfirmationModalContextProviderProps = {
  children: React.ReactNode;
};

const ConfirmationModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

const ConfirmationModalContextProvider: React.FC<
  ConfirmationModalContextProviderProps
> = (props) => {
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState<{
    title: string;
    message: string | JSX.Element;
  } | null>();
  const resolver = useRef<Function>();

  const handleShow = (
    title: string,
    message: string | JSX.Element
  ): Promise<boolean> => {
    setContent({
      title,
      message,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext: ModalContextType = {
    showConfirmation: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}

      {content && (
        <Modal isOpened={show} handleToggle={onHide} title={content.title}>
          <label>{content.message}</label>

          <div className={styles["buttons"]}>
            <Button color="error" callbackFn={handleCancel}>
              Cancel
            </Button>
            <Button color="info" callbackFn={handleOk}>
              OK
            </Button>
          </div>
        </Modal>
      )}
    </ConfirmationModalContext.Provider>
  );
};

const useConfirmationModalContext = (): ModalContextType =>
  useContext(ConfirmationModalContext);

export { useModalShow, useConfirmationModalContext };

export default ConfirmationModalContextProvider;
