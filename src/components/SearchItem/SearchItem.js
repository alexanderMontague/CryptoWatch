import React from 'react'
import css from './SearchItem.scss';

import { connect } from 'react-redux';
import { selectCoin } from '../../actions';

const SearchItem = props => {

  const { searchText, selectCoin } = props;

  return (
    <div className={css.searchItem} onClick={() => selectCoin(searchText)}>
      {searchText}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return { 
    selectCoin: searchText => dispatch(selectCoin(searchText)),
  };
};

export default connect(null, mapDispatchToProps)(SearchItem);