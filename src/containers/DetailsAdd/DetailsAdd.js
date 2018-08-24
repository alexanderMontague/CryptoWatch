import React, { Component } from "react";
import css from "./DetailsAdd.scss";
import axios from "axios";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const CORS_PROXY = "";
const API_KEY = "6d797299000adf7bbe9232e526f186ec";
const API_SECRET = "4af13353f1e4b99ab299cf9f7c5e1f5f";

// TODO: DELETE AFTER DEV DONE
const DEV_COIN_LIST = {
  coins: [
    {
      id: 363,
      name: "Bitcoin",
      symbol: "BTC",
      code: "BTC"
    },
    {
      id: 364,
      name: "Ethereum",
      symbol: "ETH",
      code: "ETH"
    },
    {
      id: 366,
      name: "Litecoin",
      symbol: "LTC",
      code: "LTC"
    }
  ]
};
const DEV_BTC = {
  coin: {
    id: 363,
    baseCurrency: "CAD",
    date: "2016-08-19",
    price: "739.06619928",
    marketCap: "11691997709.86413765",
    tradeVolume: "69862461.48171499",
    rank: 1,
    supply: "15819960",
    tradeHealth: "0.643444",
    sentiment: "bearish",
    firstData: "2013-01-02",
    mostRecentData: "2018-08-20"
  }
};

class DetailsAdd extends Component {
  state = {
    selectedDateObject: moment(),
    formattedDate: moment().format("YYYY-M-D"),
    selectedCoinId: 0,
    selectedCoinPrice: "",
    selectedCoinAmount: "",
    totalTransactionWorth: "",
    renderDateRequire: false,
    renderPriceRequire: false,
    renderAmountRequire: true
  };

  componentDidMount = () => {
    // Get coin list from historical API (to get coin ID's)
    axios
      .get("https://www.cryptocurrencychart.com/api/coin/list", {
        headers: {
          key: API_KEY,
          secret: API_SECRET
        }
      })
      .then(response => {
        const {
          coinDetails: { selectedCoin }
        } = this.props;
        const coinList = response.data.coins;
        for (let i = 0; i < coinList.length; i++) {
          // if the current coin ticker matches in our historic API, get the coin ID
          if (coinList[i].symbol === selectedCoin) {
            this.setState({ selectedCoinId: coinList[i].id });
            break;
          }
        }
        // Once we have coin id, get price from today's date
        const { selectedCoinId, formattedDate } = this.state;
        axios
          .get(
            `https://www.cryptocurrencychart.com/api/coin/view/${selectedCoinId}/${formattedDate}/CAD`,
            {
              headers: {
                key: API_KEY,
                secret: API_SECRET
              }
            }
          )
          .then(response => {
            const historicPrice = response.data.coin.price;
            this.setState({ selectedCoinPrice: historicPrice });
          })
          .catch(error => {
            console.log("GET Historic Coin Price Error: ", error);
          });
      })
      .catch(error => {
        // TODO: DEV MOCK DATA
        const {
          coinDetails: { selectedCoin }
        } = this.props;
        const coinList = DEV_COIN_LIST.coins;
        for (let i = 0; i < coinList.length; i++) {
          // if the current coin ticker matches in our historic API, get the coin ID
          if (coinList[i].symbol === selectedCoin) {
            this.setState({ selectedCoinId: coinList[i].id });
            break;
          }
        }
        // TODO: DEV MOCK DATA BELOW
        const historicPrice = DEV_BTC.coin.price;
        this.setState({ selectedCoinPrice: historicPrice });
        console.log("Get Coin List Error: ", error);
      });
  };

  dateChangeHandler = date => {
    if (date === null) {
      // if the manually inputted date is blank, show required
      this.setState({ renderDateRequire: true });
      return;
    }
    const { selectedCoinId } = this.state;
    const newFormattedDate = date.format("YYYY-M-D");
    // Update the selected date from the date picker
    this.setState({
      selectedDateObject: date,
      formattedDate: newFormattedDate,
      renderDateRequire: false
    });
    // get the price from the selected day
    axios
      .get(
        `https://www.cryptocurrencychart.com/api/coin/view/${selectedCoinId}/${newFormattedDate}/CAD`,
        {
          headers: {
            key: API_KEY,
            secret: API_SECRET
          }
        }
      )
      .then(response => {
        // Update the coin price from selected day
        const historicPrice = response.data.coin.price;
        this.setState({ selectedCoinPrice: historicPrice });
      })
      .then(error => {
        console.log("GET updated historical coin data:", error);
        // handle manual input incorrect date
      });
  };

  priceChangeHandler = input => {
    // update the manual price, and show required if blank
    this.setState({ selectedCoinPrice: input });
    if (input === "") {
      this.setState({ renderPriceRequire: true });
    } else {
      this.setState({ renderPriceRequire: false });
    }
  };

  amountChangeHandler = input => {
    // update the amount bought, and show required if blank
    this.setState({ selectedCoinAmount: input });
    if (input === "") {
      this.setState({ renderAmountRequire: true });
    } else {
      this.setState({ renderAmountRequire: false });
    }
  };

  addCoinHandler = e => {
    e.preventDefault();
    const { selectedCoinAmount, selectedCoinPrice } = this.state;
    const totalTransactionWorth = selectedCoinAmount * selectedCoinPrice;
    this.setState({ totalTransactionWorth });
    console.log("submit(state is behind)", this.state);
  };

  render() {
    const {
      baseCurrency,
      coinDetails: { coinImageURL, coinFullName }
    } = this.props;
    const {
      selectedCoinPrice,
      selectedDateObject,
      selectedCoinAmount,
      renderDateRequire,
      renderPriceRequire,
      renderAmountRequire
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
        <div className={css.detailInfoRow}>
          <form className={css.addCoinForm} onSubmit={this.addCoinHandler}>
            <label>
              Date Bought:
              <DatePicker
                className={css.addFormInput}
                selected={selectedDateObject}
                onChange={this.dateChangeHandler}
                maxDate={moment()}
              />
              {renderDateRequire && (
                <span className={css.requiredLabel}>Required</span>
              )}
            </label>
            <label>
              Price:
              <input
                className={css.addFormInput}
                type="text"
                placeholder="Enter a Price"
                name="coinPrice"
                value={selectedCoinPrice}
                onChange={input => this.priceChangeHandler(input.target.value)}
              />
              {renderPriceRequire && (
                <span className={css.requiredLabel}>Required</span>
              )}
            </label>
            <label>
              Amount Bought:
              <input
                className={css.addFormInput}
                type="text"
                placeholder="Enter an Amount"
                name="coinAmount"
                value={selectedCoinAmount}
                onChange={input => this.amountChangeHandler(input.target.value)}
              />
              {renderAmountRequire && (
                <span className={css.requiredLabel}>Required</span>
              )}
            </label>
            <button className={css.addButton} type="submit">
              Add to Portfolio
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default DetailsAdd;
