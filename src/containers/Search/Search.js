import React, { Component, Fragment } from 'react'
import css from './Search.scss';

import Header from '../../components/SectionHeader/Header';
import SearchItem from '../../components/SearchItem/SearchItem';

class Search extends Component {

  state = {
    searchResults: []
  }

  findResults = searchText => {
    const { coinObject, coinKeys } = this. props;
    let resultArray = [];
    for(let i = 0; i < coinKeys.length; i++) {  // use for loop for performance over map
      const { FullName } = coinObject[coinKeys[i]];      
      if(FullName.toLowerCase().includes(searchText.toLowerCase()) && (resultArray.length < 4) && searchText) {     // if a coin full name inclues any part of the input text
        resultArray.push(<SearchItem key={i} searchText={FullName} />);
      }
    }
    this.setState({ searchResults: resultArray });
  }
  
  render() {
    return (
      <Fragment>
        <Header title='Find Cryptocurrencies!' />
        <div className={css.searchContainer}>
          <div className={css.inputContainer}>
            <input 
              onChange={input => this.findResults(input.target.value)} 
              className={css.searchInput} 
              type='text' 
              placeholder='Start Typing a Cryptocurrency...'
            />
            <button className={css.searchButton}>Search</button>
          </div>
          { this.state.searchResults }
        </div>
      </Fragment>
    );
  }
}

export default Search;