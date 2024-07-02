import {Invitation} from '../card';
import {InviteProps} from '@/src/interfaces/_class';

const Invite = ({onInvitationClick, classes = []}: InviteProps) => {
  return (
    <>
      {classes && classes.length > 0 ? (
        classes.map(classItem => (
          <div key={classItem.id}>
            <Invitation
              ImageSrc={classItem.image}
              ClassName={classItem.name}
              ManagerName={'TEST'}
              onClick={onInvitationClick}
            />
          </div>
        ))
      ) : (
        <div>
          <p className="text-center text-2xl font-bold text-gray-900">
            現在、加入したクラスは存在しません
          </p>
        </div>
      )}
    </>
  );
};

export default Invite;
