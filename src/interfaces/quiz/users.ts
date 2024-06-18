interface Users {
  u_id: number;
  nickname: string;
  collectedRate: number | string;
  user: {
    image: string;
  };
}

export default Users;
