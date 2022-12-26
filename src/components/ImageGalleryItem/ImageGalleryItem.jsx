import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ item, goLargeImg }) {
    return (
        <li id={item.id} className={css.ImageGalleryItem} onClick={() =>goLargeImg(item.largeImageURL)}>
            <img className={css.ImageGalleryItem_image} src={item.webformatURL} alt={item.webformatURL} />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        })
    ),
    goLargeImg: PropTypes.func.isRequired,
};