import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map(image => {
          return (
            <li className={css.item} key={image.id}>
              <img
                className={css.image}
                src={image.webformatURL}
                alt={image.tags}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
