import {RoleProps} from '.';

interface PostCardProps extends RoleProps {
  ImageSrc: string;
  PostName: string;
  managerRole: boolean;
}

export default PostCardProps;
