interface ClassItem {
  id: number;
  name: string;
  description: string;
  image: string;
  is_favorite: boolean;
}

interface ClassProps {
  classes: ClassItem[];
}

export default ClassProps;
