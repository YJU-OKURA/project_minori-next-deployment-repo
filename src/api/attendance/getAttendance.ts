import AttendanceData from '@/src/interfaces/attendance/AttendanceData';
import req from '../apiUtils';

const getAttendance = async (cId: number): Promise<AttendanceData> => {
  const response = await req(`/attendances/class/${cId}`, 'get', 'gin');

  return response.data;
};

export default getAttendance;
