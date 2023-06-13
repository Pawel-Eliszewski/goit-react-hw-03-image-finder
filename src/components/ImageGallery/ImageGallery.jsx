import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  setChosenImage = e => {
    const { src, alt } = e.target;
    this.props.onImageClick(src, alt);
  };

  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map(image => {
          return (
            <li className={css.item} key={image.id}>
              <img
                id={image.id}
                className={css.image}
                src={image.largeImageURL}
                alt={image.tags}
                onClick={this.setChosenImage}
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
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
