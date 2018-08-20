import React, { Component, Fragment } from "react";
import css from "./Details.scss";
import axios from "axios";

import Header from "../../components/SectionHeader/Header";
import DetailsInDepth from "../../components/DetailsIndepth/DetailsIndepth";
import DetailsAdd from "../DetailsAdd/DetailsAdd";

// const instance = axios.create({
//   baseURL:
//     "https://www.cryptocurrencychart.com/api/coin/history/363/2017-01-01/2017-01-02/marketCap/USD",
//   headers: {
//     Key: "2c16d5c3a1ddffe77e3220182c209591",
//     Secret: "35e6059cb319421202ebea9aa4f59f07"
//   }
// });

class Details extends Component {
  state = {
    coinDetails: {
      selectedCoin: this.props.selectedCoin,
      coinFullName: "",
      coinPrice: "",
      coinMarket: "",
      coin24hr: "",
      coinVolume: "",
      coinRanking: "",
      coinImageURL: ""
    },
    baseCurrency: "$CAD",
    showGraph: false
  };

  // If the user selects a new coin
  componentDidUpdate(prevProps) {
    const { coinObject, selectedCoin } = this.props;
    if (selectedCoin && selectedCoin !== prevProps.selectedCoin) {
      // Coin info Needed
      let coinFullName = "";
      let coinImageURL = "";
      let coinPrice = "";

      // Get coin FullName and Coin Image URL
      coinFullName = coinObject[selectedCoin].FullName;
      coinImageURL =
        "https://www.cryptocompare.com" + coinObject[selectedCoin].ImageUrl;

      // Get coin Price
      axios
        .get(
          "https://min-api.cryptocompare.com/data/price?fsym=" +
            selectedCoin +
            "&tsyms=CAD"
        )
        .then(response => {
          coinPrice = "$" + response.data.CAD;
          // Set state after getting all coin info
          this.setState({
            coinDetails: {
              coinFullName: coinFullName,
              coinImageURL: coinImageURL,
              coinPrice: coinPrice
            }
          });
        })
        .catch(error => {
          console.log("Get Price Error", error);
        });

      // Get other coin information

      // axios.get('')
    }
  }

  render() {
    const { showDetails } = this.props;

    return (
      <Fragment>
        <Header title="Details" />
        {showDetails ? (
          <DetailsInDepth
            coinDetails={this.state.coinDetails}
            baseCurrency={this.state.baseCurrency}
          />
        ) : (
          // <DetailsAdd
          //   coinDetails={this.state.coinDetails}
          //   baseCurrency={this.state.baseCurrency}
          // />
          <p className={css.selectCoinMessage}>Select a Coin!</p>
        )}
      </Fragment>
    );
  }
}

export default Details;
