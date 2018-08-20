import React, { Component } from "react";
import css from "./DetailsAdd.scss";

class DetailsAdd extends Component {
  addCoinToPortfolio = e => {
    e.preventDefault();
    console.log("submit!");
  };

  render() {
    const {
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
            <div className={css.coinName}>{coinFullName}</div>
          </div>
        </div>
        <div className={css.detailInfoRow}>
          <form className={css.addCoinForm} onSubmit={this.addCoinToPortfolio}>
            <label>
              Date Bought:
              <input type="text" placeholder="Enter the Date Bought" />
            </label>
            <label>
              Price:
              <input type="text" placeholder="Enter a Price" />
            </label>
            <label>
              Amount Bought:
              <input type="text" placeholder="Enter an Amount" />
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
