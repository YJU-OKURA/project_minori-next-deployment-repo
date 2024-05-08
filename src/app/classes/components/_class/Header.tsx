import {Dropdown} from './dropdown';
import {ModalProps} from '@/src/interfaces/_class/modal';
import icons from '@/public/svgs/_class';

const Header = ({setActiveModalId}: ModalProps) => {
  const dropdownItems = [
    {
      modalId: 'classCreate',
      icon: icons.create,
      alt: 'Create Icon',
      text: '클래스 생성',
    },
    {
      modalId: 'classJoin',
      icon: icons.join,
      alt: 'Join Icon',
      text: '클래스 가입',
    },
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between me-10">
        <p className="text-black text-5xl font-medium">클래스 목록</p>
        <Dropdown
          dropdownImageSrc={icons.folder}
          items={dropdownItems}
          setActiveModalId={setActiveModalId}
          zIndex={10}
        />
      </div>
      <div className="border border-gray-200 w-11/12 mt-4" />
    </div>
  );
};

export default Header;
