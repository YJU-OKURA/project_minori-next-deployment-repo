import {ModalProps} from './modal';

interface ItemProps {
  modalId: string;
  icon: string;
  alt: string;
  text: string;
}

interface DropdownProps extends ModalProps {
  dropdownImageSrc: string;
  items: ItemProps[];
}

export default DropdownProps;
