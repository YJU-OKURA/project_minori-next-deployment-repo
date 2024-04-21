import {Dispatch, SetStateAction} from 'react';

interface ClassScheduleProps {
  setScheduleModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedSchedule: {
    ID: number;
    Title: string;
    StartedAt: string;
    EndedAt: string;
    IsLive: boolean;
  };
}

export default ClassScheduleProps;
