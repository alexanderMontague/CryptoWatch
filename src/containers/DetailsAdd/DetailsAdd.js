import React, { Component } from 'react';
import css from './DetailsAdd.scss';
import axios from 'axios';

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
    totalLotWorth: '',
    renderDateRequire: false,
    renderPriceRequire: true,
    renderAmountRequire: true,
    dataAvailable: this.props.coinDetails.dataAvailable
  };

  componentDidMount = () => {
    // check if default passed price is valid/invalid
    if (this.state.historicCoinPrice) {
      this.setState({ renderPriceRequire: false });
    }
    // if the coin is listed, but has no publicly traded data available
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
      coinDetails: { selectedCoin }
    } = this.props; // TODO: baseCurrency to comma separated array in future for multiple base currencies
    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${selectedCoin}&tsyms=${baseCurrency}&ts=${newUnixDate}`
      )
      .then(response => {
        // Update the coin price from selected day
        // response format is { SYM: { BASES: { CAD: 123, USD: 456... } } }
        console.log(response);
        const historicPrice = response.data[selectedCoin][baseCurrency];
        this.setState({ historicCoinPrice: historicPrice });
      })
      .catch(error => {
        console.log('GET updated historical coin data:', error);
        // handle manual input incorrect date
      });
  };

  priceChangeHandler = input => {
    // update the manual price, and show required if blank
    this.setState({ historicCoinPrice: input });
    !parseInt(input)
      ? this.setState({ renderPriceRequire: true })
      : this.setState({ renderPriceRequire: false });
  };

  amountChangeHandler = input => {
    // update the amount bought, and show required if blank
    this.setState({ selectedCoinAmount: input });
    !parseInt(input)
      ? this.setState({ renderAmountRequire: true })
      : this.setState({ renderAmountRequire: false });
  };

  addCoinHandler = e => {
    e.preventDefault();
    const { selectedCoinAmount, historicCoinPrice } = this.state;
    const totalLotWorth = selectedCoinAmount * historicCoinPrice;
    this.setState({ totalLotWorth }, () =>
      console.log('current state: ', this.state)
    );
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
              <img
                className={css.coinIcon}
                src={coinImageURL}
                alt="Coin Icon"
              />
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

export default DetailsAdd;
