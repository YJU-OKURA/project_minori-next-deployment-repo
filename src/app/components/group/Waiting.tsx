'use client';

import {useState} from 'react';
import {ClassWait} from './modal';
import {Card} from '../card';
import logos from '@/public/images/group';

const Waiting = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div onClick={handleModalOpen}>
        <Card
          ImageSrc={logos.wasedauni}
          ClassName={'Waseda University'}
          ClassContent={'Independence of Learning'}
          disableLink={true}
        />
      </div>
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
