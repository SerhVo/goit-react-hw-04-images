import { useState } from 'react';
import style from './Searchbar.module.css';
import css from './SearchForm.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleChange = e => {
    setRequest(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(request);
  };


  return (
    <header className={style.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
        <input
          className={css.SearchForm_input}
          name="request"
          value={request}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};