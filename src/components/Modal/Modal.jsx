import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
        {this.props.images.map(image => {
          return (
          <img src={image.largeImageURL} alt={image.tags} />
          );
        })}
        </div>
      </div>
    );
  }
}
