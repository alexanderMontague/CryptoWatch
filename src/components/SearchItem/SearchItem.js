import React from 'react'
import css from './SearchItem.scss';

const SearchItem = props => {

  const { searchText, handleClick } = props;

  return (
    <div className={css.searchItem} onClick={handleClick}>
      {searchText}
    </div>
  )
}

export default SearchItem;