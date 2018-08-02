import React, { Fragment } from 'react'
import css from './Search.scss';

import Header from '../SectionHeader/Header';
import SearchItem from '../SearchItem/SearchItem';

const Search = (props) => {

  //example response
  // "Data": {
  //   "BTC": {
  //     "Id":"1182",
  //     "Url":"/coins/btc/overview",
  //     "ImageUrl":"/media/19633/btc.png",
  //     "Name":"BTC",
  //     "Symbol":"BTC",
  //     "CoinName":"Bitcoin",
  //     "FullName":"Bitcoin (BTC)",
  //     "Algorithm":"SHA256",
  //     "ProofType":"PoW",
  //     "FullyPremined":"0",
  //     "TotalCoinSupply":"21000000",
  //     "BuiltOn":"N/A",
  //     "SmartContractAddress":"N/A",
  //     "PreMinedValue":"N/A",
  //     "TotalCoinsFreeFloat":"N/A",
  //     "SortOrder":"1",
  //     "Sponsored":false
  //   }
  // }

  const { coinObject, coinKeys } = props;

  

  return (
    <Fragment>
      <Header title='Find Cryptocurrencies!' />
      <div className={css.searchContainer}>
        <div className={css.inputContainer}>
          <input onChange={(input)=> console.log(input.target.value)} className={css.searchInput} type='text' placeholder='Start Typing a Cryptocurrency...'/>
          <button className={css.searchButton}>Search</button>
        </div>
        <SearchItem />
      </div>
    </Fragment>
  );
}

export default Search;