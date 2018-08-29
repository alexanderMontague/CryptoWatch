import React, { Component, Fragment } from 'react';
import css from './Search.scss';
import { connect } from 'react-redux';
import { selectCoin } from '../../actions';
import axios from 'axios';
import Header from '../../components/SectionHeader/Header';
import SearchItem from '../../components/SearchItem/SearchItem';

class Search extends Component {
  state = {
    searchResults: [],
    inputValue: ''
  };

  searchCoin = searchText => {
    const { coinObject, coinKeys } = this.props;

    const resultArray = [];
    !searchText ? this.props.selectCoin(undefined) : null;
    this.setState({ inputValue: searchText });
    for (let i = 0; i < coinKeys.length; i++) {
      // use for loop for performance over map
      const { FullName, Symbol } = coinObject[coinKeys[i]]; // get info from coin object
      if (
        FullName.toLowerCase().includes(searchText.toLowerCase()) &&
        resultArray.length < 5 &&
        searchText
      ) {
        // if a coin full name inclues any part of the input text and is valid
        resultArray.push(
          <SearchItem
            key={i}
            searchText={FullName}
            handleClick={this.searchForCoinHandler(FullName, Symbol)}
          />
        ); // add to the display drop down array, only show 4 coins
      }
    }
    this.setState({ searchResults: resultArray });
  };

  searchForCoinHandler = (coinName, ticker) => () => {
    this.setState({ inputValue: coinName, searchResults: [] });
    this.props.selectCoin(ticker);
  };

  render() {
    return (
      <Fragment>
        <Header title="Find Cryptocurrencies!" />
        <div className={css.inputContainer}>
          <input
            onChange={input => this.searchCoin(input.target.value)}
            className={css.searchInput}
            type="text"
            value={this.state.inputValue}
            placeholder="Start Typing a Cryptocurrency..."
          />
          <button
            className={css.searchButton}
            onClick={this.props.handleSubmit}
          >
            Search
          </button>
        </div>
        {this.state.searchResults}
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
  selectCoin
};

export default connect(
  null,
  mapDispatchToProps
)(Search);
