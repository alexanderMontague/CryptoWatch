import React, { Component } from "react";
import css from "./DetailsAdd.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from "moment";

class DetailsAdd extends Component {
  addCoinToPortfolio = e => {
    e.preventDefault();
    console.log("submit!");
  };

  state = {
    selectedDate: moment()
  };

  handleChange = date => {
    this.setState({ selectedDate: date });
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
              <DatePicker
                className={css.addFormInput}
                selected={this.state.selectedDate}
                onChange={this.handleChange}
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
