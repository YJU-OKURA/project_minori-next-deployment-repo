import {useEffect, useState} from 'react';
import Image from 'next/image';
import MaterialList from './MaterialList';
import getMaterial from '@/src/api/material/getMaterial';
import {Material} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';

const MaterialContainer = () => {
  const [materials, setMaterials] = useState<Material[]>();

  useEffect(() => {
    getMaterial(1, 1, 5).then(res => {
      console.log(res);
      setMaterials(res);
    });
  }, []);
  return (
    <div>
      {/* prompt - search */}
      <div className="w-full flex bg-white items-center mb-3 px-1">
        <Image
          src={icons.search}
          alt="icon"
          width={20}
          height={20}
          className="w-5 h-5 opacity-50"
        />
        <input
          type="text"
          className="w-full p-1 border-0 outline-none"
          placeholder="Search"
        />
      </div>
      {/* Prompt - list */}
      {materials ? <MaterialList materials={materials} /> : null}
    </div>
  );
};

export default MaterialContainer;
