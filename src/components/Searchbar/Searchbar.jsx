import { Component } from 'react';
import style from './Searchbar.module.css';
import css from './SearchForm.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    request: '',
  };

  handleChange = e => {
    this.setState({ request: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.request);
  };

  render() {
    return (
        <header className={style.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.SearchForm_button}>
                    <span className={css.SearchForm_button_label}>Search</span>
                </button>
                <input
                    className={css.SearchForm_input}
                    name="request"
                    value={this.state.request}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleChange}
                />
            </form>
        </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};