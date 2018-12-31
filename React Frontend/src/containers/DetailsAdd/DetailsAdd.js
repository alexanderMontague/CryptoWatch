import React, { Component } from 'react';
import css from './DetailsAdd.scss';
import { connect } from 'react-redux';
import { convertCurrency } from '../../helpers';
import { getCoinPrice } from '../../helpers/requests';
import {
  addToPortfolio,
  updateUserPortfolio
} from '../../actions/tradeActions';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DetailsAdd extends Component {
  state = {
    selectedDateObject: moment(),
    unixDate: moment().unix(),
    selectedCoinSymbol: this.props.coinDetails.selectedCoin, // set symbol to selected coin from search
    selectedCoinAmount: '',
    historicCoinPrice: this.props.coinDetails.coinPrice, // set default price to today's price from previous API call
    renderDateRequire: false,
    renderPriceRequire: true,
    renderAmountRequire: true,
    dataAvailable: this.props.coinDetails.dataAvailable
  };

  componentWillReceiveProps = newProps => {
    // if the selected coin gets updated in anyway, reflect those changes right away
    const {
      coinDetails: { selectedCoin, coinPrice, dataAvailable }
    } = newProps;
    this.setState({
      selectedCoinSymbol: selectedCoin,
      historicCoinPrice: coinPrice,
      dataAvailable: dataAvailable
    });
    // if new coin price is valid, remove possible previous require
    if (coinPrice !== '') {
      this.setState({ renderPriceRequire: false });
    } else {
      this.setState({ renderPriceRequire: true });
    }
  };

  componentDidMount = () => {
    // set up state with passed in props
    // check if default passed price is valid/invalid
    if (this.state.historicCoinPrice) {
      this.setState({ renderPriceRequire: false });
    } else {
      // if the coin is listed, but has no publicly traded data available
      this.setState({ dataAvailable: false });
    }
  };

  dateChangeHandler = date => {
    if (date === null) {
      // if the manually inputted date is blank, show required
      this.setState({ renderDateRequire: true });
      return;
    }

    // Update the selected date from the date picker
    const newUnixDate = date.unix();
    this.setState({
      selectedDateObject: date,
      unixDate: newUnixDate,
      renderDateRequire: false
    });

    // get the price from the selected day
    const {
      baseCurrency,
      selectedBaseCurrency,
      coinDetails: { selectedCoin }
    } = this.props; // TODO: baseCurrency to comma separated array in future for multiple base currencies
    getCoinPrice(selectedCoin, baseCurrency, newUnixDate).then(response => {
      if (response.error) {
        console.error(
          'GET updated historical coin data Error:',
          response.error
        );
      } else {
        // Update the coin price from selected day
        // response format is { SYM: { BASES: { CAD: 123, USD: 456... } } }
        const basePrice = response.data[selectedCoin][baseCurrency];
        convertCurrency(baseCurrency, selectedBaseCurrency, basePrice).then(
          convertedResponse => {
            if (convertedResponse.error) {
              console.error('GET Exchange API Error', convertedResponse.error);
            } else {
              // Set state after getting new converted coin price in selectedBase
              this.setState({ historicCoinPrice: convertedResponse.data });
            }
          }
        );
      }
    });
  };

  priceChangeHandler = input => {
    // update the manual price, and show required if blank
    this.setState({ historicCoinPrice: input });
    !!input && input !== '0'
      ? this.setState({ renderPriceRequire: false })
      : this.setState({ renderPriceRequire: true });
  };

  amountChangeHandler = input => {
    // update the amount bought, and show required if blank
    this.setState({ selectedCoinAmount: input });
    !!input && input !== '0'
      ? this.setState({ renderAmountRequire: false })
      : this.setState({ renderAmountRequire: true });
  };

  addCoinHandler = e => {
    e.preventDefault();

    const {
      selectedCoinAmount,
      historicCoinPrice,
      unixDate,
      selectedCoinSymbol
    } = this.state;

    const {
      addCoinToPortfolio,
      showDetailsInDepth,
      coinDetails: { coinImageURL },
      updateUserPortfolio
    } = this.props;

    // set up new lot object and populate with data
    const newLotDetails = {
      ticker: selectedCoinSymbol,
      imageURL: coinImageURL,
      details: {
        dateBought: unixDate,
        priceBought: historicCoinPrice,
        amountBought: selectedCoinAmount,
        totalLotWorth: selectedCoinAmount * historicCoinPrice
      }
    };

    // add the coin/lot to the portfolio, show details screen for added coin
    addCoinToPortfolio(newLotDetails);
    showDetailsInDepth();
    // add newly updated portfolio to user's portfolio in DB
    updateUserPortfolio();
  };

  render() {
    const {
      baseCurrency,
      coinDetails: { coinImageURL, coinFullName }
    } = this.props;
    const {
      historicCoinPrice,
      selectedDateObject,
      selectedCoinAmount,
      renderDateRequire,
      renderPriceRequire,
      renderAmountRequire,
      dataAvailable
    } = this.state;

    return (
      <div className={css.detailsContentContainer}>
        <div className={css.detailHeaderRow}>
          <div className={css.selectedCurrency}>
            Base:
            {<br />}
            {baseCurrency}
          </div>
          <div className={css.coinNameContainer}>
            <div className={css.imageContainer}>
              <img className={css.coinIcon} src={coinImageURL} alt="CoinIcon" />
            </div>
            <div className={css.coinName}>{coinFullName}</div>
          </div>
        </div>
        {!dataAvailable && (
          <span className={css.coinDisclaimer}>
            This coin currently does not have any trading data available. Sorry!
          </span>
        )}
        <div className={css.detailInfoRow}>
          <form className={css.addCoinForm} onSubmit={this.addCoinHandler}>
            <label>
              Date Bought:
              <DatePicker
                className={
                  renderDateRequire
                    ? [css.addFormInput, css.requiredBorder].join(' ')
                    : css.addFormInput
                }
                selected={selectedDateObject}
                onChange={this.dateChangeHandler}
                maxDate={moment()}
                type="number"
                popperPlacement="top-start"
              />
            </label>
            <label>
              Price:
              <input
                className={
                  renderPriceRequire
                    ? [css.addFormInput, css.requiredBorder].join(' ')
                    : css.addFormInput
                }
                type="number"
                placeholder="Enter a Price"
                name="coinPrice"
                value={historicCoinPrice}
                onChange={input => this.priceChangeHandler(input.target.value)}
              />
            </label>
            <label>
              Amount Bought:
              <input
                className={
                  renderAmountRequire
                    ? [css.addFormInput, css.requiredBorder].join(' ')
                    : css.addFormInput
                }
                type="number"
                step="any"
                placeholder="Enter an Amount"
                name="coinAmount"
                value={selectedCoinAmount}
                onChange={input => this.amountChangeHandler(input.target.value)}
              />
            </label>
            <button
              className={css.addButton}
              type="submit"
              disabled={
                renderDateRequire ||
                renderPriceRequire ||
                renderAmountRequire ||
                !dataAvailable
              }
            >
              Add to Portfolio
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedBaseCurrency: state.tradeState.selectedBaseCurrency,
    portfolio: state.tradeState.portfolio
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCoinToPortfolio: coinDetails => dispatch(addToPortfolio(coinDetails)),
    updateUserPortfolio: () => dispatch(updateUserPortfolio())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsAdd);
