import {Dropdown} from './dropdown';
import icons from '@/public/svgs/group';
import {ModalProps} from '@/src/interfaces/group/modal';

const Header = ({setActiveModalId}: ModalProps) => {
  const dropdownItems = [
    {
      modalId: 'classCreate',
      icon: icons.create,
      alt: 'Create Icon',
      text: 'Create Class',
    },
    {
      modalId: 'classJoin',
      icon: icons.join,
      alt: 'Join Icon',
      text: 'Join Class',
    },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between me-10">
        <h1 className="text-black text-5xl font-medium">Classes</h1>
        <Dropdown
          dropdownImageSrc={icons.folder}
          items={dropdownItems}
          setActiveModalId={setActiveModalId}
        />
      </div>
      <div className="border border-gray-200 w-11/12 mt-4"></div>
    </div>
  );
};

export default Header;
