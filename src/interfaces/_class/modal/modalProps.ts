interface ModalProps {
  setActiveModalId: (modalId: string) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  getClassAfterCreate?: () => void;
  uid?: number;
}

export default ModalProps;
