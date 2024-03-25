import {PostCard} from '../card';
import {RoleProps} from '@/src/interfaces/_class';
import logos from '@/public/images/_class';

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
