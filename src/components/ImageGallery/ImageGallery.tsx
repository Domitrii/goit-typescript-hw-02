import { Image } from "../App/App.types"
import ImageCard from "../ImageCard/ImageCard"
import css from './ImageGallery.module.css'

interface ImageGalleryProps {
  items: Image[],
  onSelect: (url: string, alt: string) => void
}

function ImageGallery({items, onSelect}: ImageGalleryProps) {
  return (
    <ul className={css.list}>
        {items.map(item => {
            return (
                <li key={item.id}>
                    <ImageCard data={item} onSelect={onSelect} />
                </li>
            )
        })}
    </ul>
  )
}

export default ImageGallery