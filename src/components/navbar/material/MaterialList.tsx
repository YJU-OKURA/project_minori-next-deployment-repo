import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MaterialForm from './MaterialForm';
import deleteMaterial from '@/src/api/material/deleteMaterial';
import postPromptAccess from '@/src/api/prompts/postPromptAccess';
import {Material, ParamsProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';

const MaterialList = ({
  materials,
  params,
  cId,
}: {
  materials: Material[];
  params: ParamsProps;
  cId: string | null;
}) => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<Material>();

  const handleClickSubject = (mId: number) => {
    if (materials[mId] && materials[mId].prompts.length === 0 && cId) {
      postPromptAccess(parseInt(cId), mId);
    }
  };

  const toggleDropdown = (index: number) => {
    setIsToggleOpen(prev =>
      prev.map((open, i) => (i === index ? !open : false))
    );
  };

  useEffect(() => {
    setIsToggleOpen(new Array(materials.length).fill(false));
  }, [materials]);

  const handleMaterialDelete = (mId: number) => {
    deleteMaterial(1, mId);
  };

  return (
    <div>
      <ul>
        {materials.map((material, index) => {
          return (
            <li className="relative flex mb-3 py-1 items-center" key={index}>
              <Image
                src={icons.book}
                alt="prompt"
                width={15}
                height={15}
                className="w-6 h-6 mr-3"
              ></Image>
              <div
                className="flex w-full items-center justify-between"
                onClick={() => handleClickSubject(parseInt(material.id))}
              >
                <Link href={`/${params.className}/${material.name}`}>
                  {material.name}
                </Link>
                <Image
                  src={icons.moreHoriz}
                  alt="icon"
                  width={30}
                  height={30}
                  onClick={() => toggleDropdown(index)}
                ></Image>
              </div>
              {isToggleOpen[index] ? (
                <div className="absolute top-[32px] right-0 z-20 bg-white rounded-lg overflow-hidden drop-shadow-lg">
                  <div
                    className="p-2 hover:bg-gray-200"
                    onClick={() => {
                      setEditData(material);
                      setIsOpen(true);
                      setIsToggleOpen(prev => prev.map(() => false));
                    }}
                  >
                    Edit Material
                  </div>
                  <div
                    className="p-2 hover:bg-gray-200"
                    onClick={() => {
                      handleMaterialDelete(parseInt(material.id));
                    }}
                  >
                    Delete
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
        {isOpen ? (
          <MaterialForm setIsOpen={setIsOpen} editData={editData} />
        ) : null}
      </ul>
    </div>
  );
};

export default MaterialList;
