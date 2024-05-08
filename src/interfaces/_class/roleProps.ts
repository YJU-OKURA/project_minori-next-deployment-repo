interface RoleProps {
  managerRole: string;
  classId?: number;
  userInfo?: {
    id: number;
    name: string;
    image: string;
    nickname: string;
  };
}

export default RoleProps;
