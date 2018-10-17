import React, { Component, Fragment } from 'react';
import css from './Search.scss';

import { connect } from 'react-redux';
import { selectCoin, hideDetails } from '../../actions';

import Header from '../../components/SectionHeader/Header';
import SearchItem from '../../components/SearchItem/SearchItem';
import Loader from 'react-loader-spinner';

class Search extends Component {
  state = {
    searchResults: [],
    inputValue: ''
  };

  searchCoin = searchText => {
    // this function searches for a coin from the input and displays the dropdown results
    const { coinObject, coinKeys } = this.props;
    const rawDataArray = [];
    const resultArray = [];

    if (!searchText) {
      const { selectCoin, hideDetails } = this.props;
      selectCoin(undefined);
      hideDetails();
      // dont return right away, won't be able to delete last character in input
    }

    this.setState({ inputValue: searchText });
    for (let i = 0; i < coinKeys.length; i++) {
      // use loop for performance over map
      const singleCoinObject = coinObject[coinKeys[i]];
      if (
        singleCoinObject.FullName.toLowerCase().includes(
          searchText.toLowerCase()
        ) &&
        searchText
      ) {
        // if a coin full name inclues any part of the input text and is valid add to the raw data array
        rawDataArray.push(singleCoinObject);
      }
    }
    if (searchText && rawDataArray.length) {
      // Sort the array in ascending order based on sort order we get from the API
      rawDataArray.sort((coinOne, coinTwo) => {
        return coinOne.SortOrder - coinTwo.SortOrder;
      });
      // Add the first 5 coins (as a search item component) to the result array
      for (let j = 0; j < 5; j++) {
        if (rawDataArray[j]) {
          const { FullName, Symbol } = rawDataArray[j];
          resultArray.push(
            <SearchItem
              key={j}
              searchText={FullName}
              handleClick={this.searchForCoinHandler(FullName, Symbol)}
            />
          ); // add to the display drop down array, only show 5 coins
        }
      }
    }
    this.setState({ searchResults: resultArray });
  };

  // Click handler for each drop down item
  searchForCoinHandler = (coinName, ticker) => () => {
    this.setState({ inputValue: coinName, searchResults: [] });
    this.props.selectCoin(ticker);
  };

  onSearchHandler = () => {
    // this function is so the selected coin is updated by clicking the search button
    this.searchCoin(this.state.inputValue); // see if the input is valid and can be mapped to a coin
    this.props.handleSubmit(); // then run the show details portion for the input in the Layout component
    this.setState({ searchResults: [] });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <Fragment>
        <Header title="Find Cryptocurrencies!" />
        <div className={css.inputContainer}>
          {isLoading ? (
            <Loader type="Oval" color="#64b5f6" height="40" width="40" />
          ) : (
            <input
              onChange={input => this.searchCoin(input.target.value)}
              className={css.searchInput}
              type="text"
              value={this.state.inputValue}
              placeholder="Start Typing a Cryptocurrency..."
              disabled={isLoading}
            />
          )}
          <button className={css.searchButton} onClick={this.onSearchHandler}>
            Search
          </button>
        </div>
        {this.state.searchResults}
        <div className={css.searchToolTip}>
          {/* TODO: Make a hoverable tooltip */}
          If the coin you are searching for does not appear, try using the
          ticker/symbol!
        </div>
      </Fragment>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     selectCoin: ticker => dispatch(selectCoin(ticker)),
//   };
// };
// Condensed version of above ^
const mapDispatchToProps = {
  selectCoin,
  hideDetails
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
