interface errorProps {
  purpose: 'delete' | 'leave';
  func: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default errorProps;
