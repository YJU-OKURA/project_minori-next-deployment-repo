import {Invitation} from '../card';
import logos from '@/public/images/group';
import {InviteProps} from '@/src/interfaces/group';

const Invite = ({onInvitationClick}: InviteProps) => {
  return (
    <Invitation
      ImageSrc={logos.github}
      ClassName={'Github'}
      ManagerName={'TenJinseok'}
      onClick={onInvitationClick}
    />
  );
};

export default Invite;
