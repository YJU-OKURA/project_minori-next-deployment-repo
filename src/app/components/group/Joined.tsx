import {Favorite, Created} from '.';

const Joined = () => {
  return (
    <>
      <Favorite />
      <Created />
      <div className="border rounded-lg w-80 h-72 border-gray-300 mr-10 mb-10 text-black">
        Normal Group1
      </div>
      <div className="border rounded-lg w-80 h-72 border-gray-300 mr-10 mb-10 text-black">
        Normal Group2
      </div>
    </>
  );
};

export default Joined;
