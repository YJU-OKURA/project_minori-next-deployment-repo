import getClassSchedule from './getClassSchedule';
import getClassScheduleList from './getClassScheduleList';
import postCreateClassSchedule from './postCreateClassSchedule';
import deleteClassSchedule from './deleteClassSchedule';
import patchClassSchedule from './patchClassSchedule';

const classScheduleAPI = {
  getClassSchedule,
  getClassScheduleList,
  postCreateClassSchedule,
  deleteClassSchedule,
  patchClassSchedule,
};

export default classScheduleAPI;
