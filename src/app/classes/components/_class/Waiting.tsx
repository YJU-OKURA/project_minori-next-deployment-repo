'use client';

import {useState} from 'react';
import {ClassWait} from './modal';
import {ClassProps} from '@/src/interfaces/_class';
import logos from '@/public/images/_class';

const Waiting = ({classes}: ClassProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {classes &&
        classes.map(classItem => (
          <div key={classItem.id}>
            <ClassWait
              ImageSrc={classItem.image}
              ClassName={classItem.name}
              setIsModalOpen={setModalOpen}
            />
          </div>
        ))}
      {modalOpen && (
        <ClassWait
          ImageSrc={logos.wasedauni}
          ClassName={'Waseda University'}
          setIsModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default Waiting;
