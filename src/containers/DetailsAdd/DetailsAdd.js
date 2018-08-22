import React, { Component } from "react";
import css from "./DetailsAdd.scss";
import axios from "axios";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

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
class DetailsAdd extends Component {
  state = {
    selectedDateObject: moment(),
    formattedDate: moment().format("YYYY-M-D"),
    selectedCoinId: 0,
    selectedCoinPrice: ""
  };

  componentDidMount = () => {
    // Get coin list from historical API (to get coin ID's)
    axios
      .get("https://www.cryptocurrencychart.com/api/coin/list", {
        headers: {
          key: API_KEY,
          secret: API_SECRET,
          "Access-Control-Allow-Origin": "https://www.cryptocurrencychart.com"
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
        // Once we have coin id, get price from that day
        axios
          .get(
            `https://www.cryptocurrencychart.com/api/coin/view/${
              this.state.selectedCoinId
            }/${this.state.formattedDate}/CAD`,
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
          .catch(error =>
            console.log("GET Historic Coin Price Error: ", error)
          );
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

        console.log("Get Coin List Error: ", error);
      });
  };

  dateChangeHandler = date => {
    this.setState({
      selectedDateObject: date,
      formattedDate: date.format("YYYY-M-D")
    });
  };

  addCoinHandler = e => {
    e.preventDefault();
    console.log("submit!");
    console.log(this.state);
  };

  render() {
    const {
      baseCurrency,
      coinDetails: { coinImageURL, coinFullName, selectedCoin }
    } = this.props;

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
                selected={this.state.selectedDateObject}
                onChange={this.dateChangeHandler}
                maxDate={moment()}
              />
            </label>
            <label>
              Price:
              <input
                className={css.addFormInput}
                type="text"
                placeholder="Enter a Price"
                name="coinPrice"
              />
            </label>
            <label>
              Amount Bought:
              <input
                className={css.addFormInput}
                type="text"
                placeholder="Enter an Amount"
                name="coinAmount"
              />
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