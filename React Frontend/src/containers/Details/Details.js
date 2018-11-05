import React, { Component, Fragment } from 'react';
import css from './Details.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import { convertCurrency } from '../../helpers';
import { getCoinPrice } from '../../helpers/requests';

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
  async componentDidUpdate(prevProps) {
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
      const newCoinPrice = await getCoinPrice(
        selectedCoin,
        baseCurrency,
        unixDate
      );

      // if the coin is listed, but has no publicly traded data available
      if (newCoinPrice.error) {
        this.setState({
          coinDetails: {
            selectedCoin,
            coinFullName,
            coinImageURL,
            coinPrice,
            dataAvailable: false
          }
        });
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
        console.log('GET Coin Price Error', error);
      } else {
        const basePrice = newCoinPrice.data[selectedCoin][baseCurrency];
        const convertedCoinPrice = await convertCurrency(
          baseCurrency,
          selectedBaseCurrency,
          basePrice
        );
        if (convertedCoinPrice.error) {
          console.log('GET Exchange API Error', convertedCoinPrice.error);
        } else {
          // Set state after getting all coin info
          this.setState({
            coinDetails: {
              selectedCoin,
              coinFullName,
              coinImageURL,
              coinPrice: convertedCoinPrice.data,
              dataAvailable
            }
          });
        }
      }
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
    selectedBaseCurrency: state.selectedBaseCurrency,
    showDetails: state.showDetails
  };
};

export default connect(mapStateToProps)(Details);
