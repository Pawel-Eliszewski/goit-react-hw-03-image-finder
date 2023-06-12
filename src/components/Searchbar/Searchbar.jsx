import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newSearch = { name: this.state.name };
    this.props.onFormSubmit(newSearch);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form
          type="submit"
          onSubmit={this.handleSubmit}
          className={css.searchform}
        >
          <button type="submit" className={css.button}></button>
          <input
            className={css.input}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
