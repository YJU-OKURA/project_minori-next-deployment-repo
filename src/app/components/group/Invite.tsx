import {Invitation} from '../card';
import logos from '@/public/images/group';

const Invite = () => {
  return (
    <Invitation
      ImageSrc={logos.github}
      ClassName={'Github'}
      ManagerName={'TenJinseok'}
    />
  );
};

export default Invite;
