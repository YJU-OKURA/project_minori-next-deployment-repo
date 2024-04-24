import Material from './material';

interface FormProps {
  setIsOpen: (value: boolean) => void;
  editData?: Material;
  cId: string;
}

export default FormProps;
