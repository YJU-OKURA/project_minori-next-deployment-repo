import Image from 'next/image';
import Link from 'next/link';
import {Material} from '@/src/interfaces/navbar';
import icons from '@/public/svgs/navbar';

const MaterialList = ({materials}: {materials: Material[]}) => {
  return (
    <div>
      <ul>
        {materials.map((material, index) => {
          return (
            <li className="flex mb-3 py-1 items-center" key={index}>
              <Image
                src={icons.book}
                alt="prompt"
                width={15}
                height={15}
                className="w-6 h-6 mr-3"
              ></Image>
              <div className="flex w-full items-center justify-between">
                <Link href={`/${material.name}`} className="">
                  {material.name}
                </Link>
                <Image
                  src={icons.moreHoriz}
                  alt="icon"
                  width={30}
                  height={30}
                ></Image>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MaterialList;
