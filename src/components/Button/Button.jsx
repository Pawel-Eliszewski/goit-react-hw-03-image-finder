import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export class Button extends Component {
  fetchNextPage = () => {
    this.props.onLoadMore();
  }

  render() {
    return (
      <button
        type="button"
        className={css.button}
        onClick={() => this.fetchNextPage()}
      >
        <span className={css.label}>Load more</span>
      </button>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
}