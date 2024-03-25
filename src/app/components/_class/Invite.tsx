import {Invitation} from '../card';
import logos from '@/public/images/_class';
import {InviteProps} from '@/src/interfaces/_class';

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
