import {RoleProps} from '.';

interface PostCardProps extends RoleProps {
  imageSrc: string;
  postName: string;
  managerRole: boolean;
  postId: number;
}

export default PostCardProps;
