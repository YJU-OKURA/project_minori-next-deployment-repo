interface PostBoardData {
  title: string;
  content: string;
  cid: number;
  uid: number;
  is_announced: boolean;
  image?: File;
}

export default PostBoardData;
