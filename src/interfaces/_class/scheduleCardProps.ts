import {RoleProps} from '.';

interface ScheduleCardProps extends RoleProps {
  scheduleName: string;
  startTime: string;
  endTime: string;
  managerRole: boolean;
  isLive: boolean;
  scheduleId: number;
}

export default ScheduleCardProps;
