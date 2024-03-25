import {RoleProps} from '.';

interface ScheduleCardProps extends RoleProps {
  scheduleName: string;
  time: string;
  managerRole: boolean;
}

export default ScheduleCardProps;
