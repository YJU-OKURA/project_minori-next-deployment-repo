interface ModalProps {
  setActiveModalId: (modalId: string) => void;
  setIsModalOpen?: (isOpen: boolean) => void;
  getClassAfterCreate?: () => void;
  uid?: number;
  name?: string;
}

export default ModalProps;
