import ManageSubContainer from './manageSubComponents/ManageSubContainer';
import Material from './Material';
import '@/src/styles/variable.css';

const ManageMaterialContainer = () => {
  return (
    <div className="flex manageContainer2">
      <div className="w-2/3">
        <Material />
      </div>
      <div className="px-3">
        <div className="h-full w-0.5 bg-gray-200"></div>
      </div>
      <div className="w-1/3">
        <ManageSubContainer />
      </div>
    </div>
  );
};

export default ManageMaterialContainer;
