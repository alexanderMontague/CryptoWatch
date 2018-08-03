import React from 'react'
import css from './SearchItem.scss';

const SearchItem = (props) => {
  return (
    <div className={css.searchItem}>
      {props.searchText}
    </div>
  )
}

export default SearchItem;