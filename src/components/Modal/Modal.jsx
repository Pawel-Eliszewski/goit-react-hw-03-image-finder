import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.onEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onEsc);
  }

  render() {
    return (
      <div className={css.overlay} id="overlay" onClick={this.props.onClick}>
        <div className={css.modal}>
          <img src={this.props.modalUrl} alt={this.props.modalAlt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalUrl: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onEsc: PropTypes.func.isRequired,
};
