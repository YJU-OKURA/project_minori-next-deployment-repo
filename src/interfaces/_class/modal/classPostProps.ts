import {Dispatch, SetStateAction} from 'react';

interface ClassPostProps {
  setShowPostModal: Dispatch<SetStateAction<boolean>>;
  selectedPost: {
    ID: number;
    Title: string;
    Image: string;
    Content: string;
  };
}

export default ClassPostProps;
