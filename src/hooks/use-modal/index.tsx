import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  modalOpened?: boolean;
  setModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  setModal?: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

export const ModalContext = createContext<ModalContextType>({});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [modal, setModal] = useState<React.ReactNode>(null);

  return (
    <ModalContext.Provider
      value={{ modalOpened: opened, setModalOpened: setOpened, setModal }}
    >
      {children}
      <div id="modal-root">{opened && modal}</div>
    </ModalContext.Provider>
  );
};

const createModal =
  <P extends {}>(component: React.ComponentType<P>) =>
  (props: P) => {
    const root = document.getElementById("modal-root");
    if (!root) return null;
    return createPortal(
      React.createElement<P>(component, props),
      document.getElementById("modal-root") as HTMLDivElement
    );
  };

export const useModal = <P extends {}>(component: React.ComponentType<P>) => {
  const { modalOpened, setModalOpened, setModal } = useContext(ModalContext);
  const renderModal = createModal(component);

  return {
    openModal: (props: P) => {
      if (modalOpened) {
        setModal?.(null);
        setModalOpened?.(true);
      }
      const element = renderModal(props);
      setModal?.(element);
      setModalOpened?.(true);
    },
    closeModal: () => {
      setModalOpened?.(false);
    },
  };
};

export const useModalClose = () => {
  const { setModalOpened } = useContext(ModalContext);

  return {
    closeCurrentModal: () => {
      setModalOpened?.(false);
    },
  };
};
