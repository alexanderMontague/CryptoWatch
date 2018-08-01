import React, { Fragment } from 'react'
import Header from '../SectionHeader/Header';
import css from './Search.scss';

const Search = (props) => {
  return (
    <Fragment>
      <Header title='Find Cryptocurrencies!' />
      <div className={css.searchContainer}>
        <div className={css.inputContainer}>
          <input onChange={(value)=> console.log('hello' + value)} className={css.searchInput} type='text' placeholder='Start Typing a Cryptocurrency...'/>
          <button className={css.searchButton}>Search</button>
        </div>
      </div>
    </Fragment>
  );
}

export default Search;
