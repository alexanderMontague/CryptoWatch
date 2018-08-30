import React, { Component, Fragment } from 'react';
import css from './Details.scss';
import axios from 'axios';

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
    baseCurrency: 'CAD',
    showGraph: false
  };

  // If the user selects a new coin
  componentDidUpdate(prevProps) {
    const { coinObject, selectedCoin } = this.props;
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
          'https://min-api.cryptocompare.com/data/price?fsym=' +
            selectedCoin +
            '&tsyms=CAD'
        )
        .then(response => {
          // if the coin is listed, but has no publicly traded data available
          if (response.data.Message) {
            dataAvailable = false;
          } else {
            coinPrice = response.data.CAD;
          }
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
        })
        .catch(error => {
          // TODO: DELETE DEV STUFF BELOW
          if (selectedCoin === 'BTC') {
            coinPrice = 8765;
          } else if (selectedCoin === 'ETH') {
            coinPrice = 320;
          } else {
            coinPrice = 169;
          }
          this.setState({
            coinDetails: {
              selectedCoin,
              coinFullName,
              coinImageURL,
              coinPrice
            }
          });
          console.log('GET Coin Price Error', error);
        });
    }
  }

  render() {
    const { showDetails } = this.props;

    return (
      <Fragment>
        <Header title="Details" />
        {showDetails ? (
          // <DetailsInDepth
          //   coinDetails={this.state.coinDetails}
          //   baseCurrency={this.state.baseCurrency}
          // />
          <DetailsAdd
            coinDetails={this.state.coinDetails}
            baseCurrency={this.state.baseCurrency}
          />
        ) : (
          <p className={css.selectCoinMessage}>Select a Coin!</p>
        )}
      </Fragment>
    );
  }
}

export default Details;
