import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.props.onClose();
      }
    });
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.props.onClose}>
        <div className={css.modal}>
          <img
            src={this.props.chosenImageLargeUrl}
            alt={this.props.chosenImageAlt}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  chosenImageLargeUrl: PropTypes.string.isRequired,
  chosenImageAlt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
