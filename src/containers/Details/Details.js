import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import css from './Details.scss';
import axios from 'axios';
import moment from 'moment';
import { convertCurrency } from '../../helpers';

import Header from '../../components/SectionHeader/Header';
import DetailsInDepth from '../../components/DetailsIndepth/DetailsIndepth';
import DetailsAdd from '../DetailsAdd/DetailsAdd';

class Details extends Component {
  state = {
    coinDetails: {
      selectedCoin: '',
      coinFullName: '',
      coinPrice: '',
      coinMarket: '',
      coin24hr: '',
      coinVolume: '',
      coinRanking: '',
      coinImageURL: '',
      dataAvailable: true
    },
    showGraph: false
  };

  // If the user selects a new coin
  componentDidUpdate(prevProps) {
    const {
      coinObject,
      selectedCoin,
      baseCurrency, // see store.js for difference and reasoning between base/selectedBaseCurr
      selectedBaseCurrency
    } = this.props;
    const unixDate = moment().unix();
    if (selectedCoin && selectedCoin !== prevProps.selectedCoin) {
      // Coin info Needed
      let coinFullName = '';
      let coinImageURL = '';
      let coinPrice = '';
      let dataAvailable = true;

      // Get coin FullName and Coin Image URL
      coinFullName = coinObject[selectedCoin].FullName;
      coinImageURL =
        'https://www.cryptocompare.com' + coinObject[selectedCoin].ImageUrl;

      // Get coin Price
      axios
        .get(
          `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${selectedCoin}&tsyms=${baseCurrency}&ts=${unixDate}`
        )
        .then(response => {
          // if the coin is listed, but has no publicly traded data available
          if (response.data.Response === 'Error') {
            dataAvailable = false;
            this.setState({
              coinDetails: {
                selectedCoin,
                coinFullName,
                coinImageURL,
                coinPrice,
                dataAvailable
              }
            });
          } else {
            const basePrice = response.data[selectedCoin][baseCurrency];
            convertCurrency(baseCurrency, selectedBaseCurrency, basePrice).then(
              // convertCurrency returns a promise as there is an API call to the currency exchange
              newValue => {
                const coinPrice = newValue;
                // Set state after getting all coin info
                this.setState({
                  coinDetails: {
                    selectedCoin,
                    coinFullName,
                    coinImageURL,
                    coinPrice,
                    dataAvailable
                  }
                });
              }
            );
          }
        })
        .catch(error => {
          // TODO: DELETE DEV STUFF BELOW
          if (selectedCoin === 'BTC') {
            coinPrice = 8765;
          } else if (selectedCoin === 'ETH') {
            coinPrice = 320;
          } else if (selectedCoin === 'CC') {
            coinPrice = 0;
          } else {
            coinPrice = 169;
          }
          this.setState({
            coinDetails: {
              selectedCoin,
              coinFullName,
              coinImageURL,
              coinPrice,
              dataAvailable
            }
          });
          console.log('GET Coin Price Error', error);
        });
    }
  }

  render() {
    const {
      showDetails,
      baseCurrency,
      inPortfolio,
      addAnotherLot,
      showDetailsInDepth
    } = this.props;
    return (
      <Fragment>
        <Header title="Details" />
        {showDetails ? (
          inPortfolio ? (
            <DetailsInDepth
              coinDetails={this.state.coinDetails}
              baseCurrency={baseCurrency}
              addAnotherLot={addAnotherLot}
            />
          ) : (
            <DetailsAdd
              coinDetails={this.state.coinDetails}
              baseCurrency={baseCurrency}
              showDetailsInDepth={showDetailsInDepth}
            />
          )
        ) : (
          <p className={css.selectCoinMessage}>Select a Coin!</p>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    baseCurrency: state.baseCurrency,
    selectedBaseCurrency: state.selectedBaseCurrency
  };
};

export default connect(mapStateToProps)(Details);
