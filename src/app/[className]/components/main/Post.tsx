import {PostCard} from '../card';
import {RoleProps} from '@/src/interfaces/group';
import logos from '@/public/images/group';

const Post = ({managerRole}: RoleProps) => {
  return (
    <>
      <div className="mt-2">
        <PostCard
          ImageSrc={logos.github}
          PostName={'How to use Github?'}
          managerRole={managerRole}
        />
      </div>
    </>
  );
};

export default Post;
