import {RoleProps} from '.';

interface PostCardProps extends RoleProps {
  imageSrc: string;
  postName: string;
  postId: number;
}

export default PostCardProps;
