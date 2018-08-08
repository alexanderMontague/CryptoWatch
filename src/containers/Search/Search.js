import React, { Component, Fragment } from 'react'
import css from './Search.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectCoin } from '../../actions';

import Header from '../../components/SectionHeader/Header';
import SearchItem from '../../components/SearchItem/SearchItem';

class Search extends Component {

  // DEV BELOW
  mockRes = {
    "BTC": {
      "Id":"1182",
      "ImageUrl":"/media/19633/btc.png",
      "Name":"BTC",
      "Symbol":"BTC",
      "CoinName":"Bitcoin",
      "FullName":"Bitcoin (BTC)",
      "Algorithm":"SHA256",
    },
    "ETH": {
      "Id":"1182",
      "Url":"/coins/btc/overview",
      "ImageUrl":"/media/19633/btc.png",
      "Name":"ETH",
      "Symbol":"ETH",
      "CoinName":"Ethereum",
      "FullName":"Ethereum (ETH)",
    },"LTC": {
      "Id":"1182",
      "Url":"/coins/btc/overview",
      "ImageUrl":"/media/19633/btc.png",
      "Name":"LTC",
      "Symbol":"LTC",
      "CoinName":"Litecoin",
      "FullName":"Litecoin (LTC)",
      "Algorithm":"SHA256",
    },
  }

  componentDidMount() {
    // Get list of all coins from API
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => {
        const totalCoinsObject = response.data.Data;
        const coinKeyArray = Object.keys(totalCoinsObject);
        this.setState({ coinObject: totalCoinsObject, coinKeys: coinKeyArray });        
      })
      .catch(error => {
        // DEV BELOW
        const totalCoinsObject = this.mockRes;
        const coinKeyArray = Object.keys(totalCoinsObject);
        this.setState({ coinObject: totalCoinsObject, coinKeys: coinKeyArray });
        console.log('Get Coinlist Error', error);
      });
  }

  state = {    
    searchResults: [],
    inputValue: '',
  }

  searchCoin = searchText => {
    const { coinObject, coinKeys } = this.state;
    const resultArray = [];
    !searchText ? this.props.selectCoin(undefined) : null;
    this.setState({ inputValue: searchText });
    for(let i = 0; i < coinKeys.length; i++) {  // use for loop for performance over map
      const { FullName, Symbol } = coinObject[coinKeys[i]]; // get info from coin object
      if(FullName.toLowerCase().includes(searchText.toLowerCase()) && (resultArray.length < 6) && searchText) {  // if a coin full name inclues any part of the input text and is valid
        resultArray.push(<SearchItem key={i} searchText={FullName} handleClick={this.searchForCoinHandler(FullName, Symbol)}/>);  // add to the display drop down array, only show 4 coins
      }
    }
    this.setState({ searchResults: resultArray });
  }

  searchForCoinHandler = (coinName, ticker) => () => {
    this.setState({ inputValue: coinName, searchResults: [] });
    this.props.selectCoin(ticker);
  }
  
  render() {
    return (
      <Fragment>
        <Header title='Find Cryptocurrencies!' />
        <div className={css.searchContainer}>
          <div className={css.inputContainer}>
            <input 
              onChange={input => this.searchCoin(input.target.value)} 
              className={css.searchInput} 
              type='text'
              value={this.state.inputValue} 
              placeholder='Start Typing a Cryptocurrency...'
            />
            <button className={css.searchButton} onClick={this.props.handleSubmit}>Search</button>
          </div>
          { this.state.searchResults }
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    selectCoin: ticker => dispatch(selectCoin(ticker)),
  };
};

export default connect(null, mapDispatchToProps)(Search);