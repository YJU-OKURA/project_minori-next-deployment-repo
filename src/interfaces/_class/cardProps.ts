interface CardProps {
  ImageSrc: string;
  ClassName: string;
  ClassContent: string;
  FavoriteChecked?: boolean;
  disableLink?: boolean;
  ClassId: number;
  uid?: number;
}

interface CardItemProps {
  classData: CardProps;
}

export default CardItemProps;
