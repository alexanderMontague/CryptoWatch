import React, { Component, Fragment } from 'react';
import css from './Details.scss';
import { connect } from 'react-redux';
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
      baseCurrency // see store.js for difference and reasoning between base/selectedBaseCurr
    } = this.props;

    if (selectedCoin && selectedCoin !== prevProps.selectedCoin) {
      // Coin info Needed
      let coinFullName = '';
      let coinImageURL = '';

      // Get coin FullName and Coin Image URL
      coinFullName = coinObject[selectedCoin].FullName;
      coinImageURL =
        'https://www.cryptocompare.com' + coinObject[selectedCoin].ImageUrl;

      // Get coin Price
      const newCoinPrice = await getCoinPrice(selectedCoin, baseCurrency);

      // if the coin is listed, but has no publicly traded data available
      if (!newCoinPrice || newCoinPrice.error) {
        this.setState({
          coinDetails: {
            selectedCoin,
            coinFullName,
            coinImageURL,
            coinPrice: 0,
            dataAvailable: false
          }
        });
      } else {
        // Set state after getting all coin info
        this.setState({
          coinDetails: {
            selectedCoin,
            coinFullName,
            coinImageURL,
            coinPrice: newCoinPrice,
            dataAvailable: true
          }
        });
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
    baseCurrency: state.tradeState.baseCurrency,
    showDetails: state.tradeState.showDetails
  };
};

export default connect(mapStateToProps)(Details);
