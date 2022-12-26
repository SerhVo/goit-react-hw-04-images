import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({ items, goLargeImg })  {
  return (
      <ul className={css.ImageGallery}>
          {items.map((item) => (
             <ImageGalleryItem
                  key={item.id}
                  item={item}
                  goLargeImg={goLargeImg}
              />
          ))}
      </ul>
    );
  }

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    ),
    goLargeImg: PropTypes.func.isRequired,
};