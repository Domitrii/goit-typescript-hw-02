import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  data: Image,
  onSelect: (url: string, alt: string) => void;
}

const ImageCard = ({ data, onSelect }:ImageCardProps) => {
  return (
    <div
      onClick={() => onSelect(data.urls.regular, data.alt_description)}
    >
      <img
        className={css.imgItem}
        src={data.urls.small}
        alt={data.alt_description}
      />
    </div>
  );
};

export default ImageCard;