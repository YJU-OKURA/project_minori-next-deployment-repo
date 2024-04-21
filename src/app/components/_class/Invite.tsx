import {Invitation} from '../card';
import logos from '@/public/images/_class';
import {InviteProps} from '@/src/interfaces/_class';

const Invite = ({onInvitationClick, classes = []}: InviteProps) => {
  return (
    <>
      {classes &&
        classes.map(classItem => (
          <div key={classItem.id}>
            <Invitation
              ImageSrc={classItem.image}
              ClassName={classItem.name}
              ManagerName={'TEST'}
              onClick={onInvitationClick}
            />
          </div>
        ))}
      <Invitation
        ImageSrc={logos.github}
        ClassName={'Github'}
        ManagerName={'TenJinseok'}
        onClick={onInvitationClick}
      />
    </>
  );
};

export default Invite;
