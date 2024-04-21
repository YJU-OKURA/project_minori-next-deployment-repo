interface errorProps {
  purpose: 'delete' | 'leave';
  func: (name: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default errorProps;
