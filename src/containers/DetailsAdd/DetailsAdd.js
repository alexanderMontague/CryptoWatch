import React, { Component } from "react";
import css from "./DetailsAdd.scss";

class DetailsAdd extends Component {
  render() {
    const {
      showGraph,
      baseCurrency,
      coinDetails: { coinImageURL, coinFullName, coinPrice }
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
            <div>{coinFullName}</div>
          </div>
        </div>
        <div className={css.detailInfoRow}>
          <div className={css.coinInfoRow}>
            <span>Price: {coinPrice}</span>
            <span>Market Cap: ___</span>
          </div>
          <div className={css.coinInfoRow}>
            <span>24hr Change: ___</span>
            <span>Volume: ___</span>
          </div>
          <div className={css.coinInfoRow}>
            <span>Coin Ranking: ___</span>
          </div>
        </div>
        <div className={css.addToggleCoinContainer}>
          <div className={css.buttonContainers}>
            <button className={css.addButton}>Add to Portfolio</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsAdd;
