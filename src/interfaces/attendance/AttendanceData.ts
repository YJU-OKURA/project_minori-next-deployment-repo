import AttendanceProps from './AttendanceProps';
import AttendanceUser from './AttendanceUser';

interface AttendanceData {
  attendances: AttendanceUser[];
  statistics: AttendanceProps;
}

export default AttendanceData;
