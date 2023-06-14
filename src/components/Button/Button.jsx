import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Button.module.css';

export class Button extends Component {
  componentWillUnmount() {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  render() {
    return (
      <button type="button" className={css.button} onClick={this.props.onClick}>
        <span className={css.label}>Load more</span>
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
