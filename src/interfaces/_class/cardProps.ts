interface CardProps {
  ImageSrc: string;
  ClassName: string;
  ClassContent: string;
  FavoriteChecked?: boolean;
  disableLink?: boolean;
  ClassId?: number;
}

interface CardItemProps {
  classData: CardProps;
}

export default CardItemProps;
