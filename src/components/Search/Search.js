import React, { Fragment } from 'react'
import Header from '../SectionHeader/Header';
import css from './Search.scss';

const Search = (props) => {
  return (
    <Fragment>
      <Header title='Search' />
      <div className={css.searchContainer}>
        <p className={css.searchParagraph}>Search for a CryptoCurrency!</p>
        <input className={css.searchInput} type='text' />
      </div>
    </Fragment>
  );
}

export default Search;
