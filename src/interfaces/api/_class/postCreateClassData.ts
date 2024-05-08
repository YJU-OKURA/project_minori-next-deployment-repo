interface PostCreateClassData {
  name: string;
  limitation: number;
  description: string;
  userId: number;
  image: File | null;
  secret: string;
}

export default PostCreateClassData;
