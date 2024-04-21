interface ModalProps {
  setActiveModalId: (modalId: string) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  getClassAfterCreate?: () => void;
}

export default ModalProps;
