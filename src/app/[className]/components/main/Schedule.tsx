import {ScheduleCard} from '../card';
import {RoleProps} from '@/src/interfaces/group';

const Schedule = ({managerRole}: RoleProps) => {
  const scheduleArray = [
    {scheduleName: 'Project Management1', time: 'Mar 3rd ~ 5th'},
    {scheduleName: 'Project Management2', time: 'Mar 6th ~ 9th'},
    {scheduleName: 'Project Management3', time: 'Mar 11th ~ 14th'},
    {scheduleName: 'Project Management4', time: 'Mar 15th ~ 18th'},
    {scheduleName: 'Project Management5', time: 'Mar 21st ~ 25th'},
  ];

  return (
    <div className="ms-2 flex overflow-x-auto scrollbar-visible">
      {scheduleArray.map((schedule, index) => (
        <ScheduleCard
          key={index}
          scheduleName={schedule.scheduleName}
          time={schedule.time}
          managerRole={managerRole}
        />
      ))}
    </div>
  );
};

export default Schedule;
