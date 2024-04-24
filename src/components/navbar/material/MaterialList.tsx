import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MaterialForm from './MaterialForm';
import deleteMaterial from '@/src/api/material/deleteMaterial';
import postPromptAccess from '@/src/api/prompts/postPromptAccess';
import {Material, ParamsProps} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import materialState from '@/src/recoil/atoms/materialState';
import classUserState from '@/src/recoil/atoms/classUserState';
import ROLES from '@/src/constants/roles';

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
  const setMaterialState = useSetRecoilState(materialState);
  const classUser = useRecoilValue(classUserState);

  const handleClickSubject = (mId: number) => {
    const material = materials.find(material => material.id === String(mId));
    if (material?.prompts.length === 0 && cId) {
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
    if (cId) deleteMaterial(parseInt(cId), mId);
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
                width={30}
                height={30}
                className="mr-3"
              ></Image>
              <div
                className="flex w-full items-center justify-between"
                onClick={() => handleClickSubject(parseInt(material.id))}
              >
                <Link href={`/${params.className}/${material.name}`}>
                  <div
                    className="min-h-[30px]"
                    onClick={() => setMaterialState(material)}
                  >
                    {material.name}
                  </div>
                </Link>
                {classUser && ROLES[classUser?.role_id] === 'ADMIN' ? (
                  <Image
                    src={icons.moreHoriz}
                    alt="icon"
                    width={30}
                    height={30}
                    onClick={() => toggleDropdown(index)}
                  ></Image>
                ) : null}
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
        {isOpen && cId ? (
          <MaterialForm setIsOpen={setIsOpen} editData={editData} cId={cId} />
        ) : null}
      </ul>
    </div>
  );
};

export default MaterialList;
