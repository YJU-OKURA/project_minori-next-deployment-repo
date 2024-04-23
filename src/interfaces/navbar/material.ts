interface Material {
  id: string;
  name: string;
  file: {
    m_path: string;
  };
  prompts: {
    id: number;
  }[];
}

export default Material;
