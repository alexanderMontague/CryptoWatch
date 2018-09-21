import React, { Component, Fragment } from 'react';
import css from './PortfolioItem.scss';

import CoinLots from '../CoinLots/CoinLots';

class PortfolioItem extends Component {
  state = {
    showLots: false
  };

  showLotHandler = () => {
    this.setState({ showLots: !this.state.showLots });
  };

  render() {
    const { itemIconURL, ticker, lots } = this.props;
    let totalItemAmount = 0;
    let totalItemValue = 0;
    let numLots = lots.length;
    lots.map(lot => {
      totalItemAmount += parseFloat(lot.amountBought);
      totalItemValue += parseFloat(lot.totalLotWorth);
    });

    return (
      <Fragment>
        <div
          className={css.portfolioItemContainer}
          onClick={this.showLotHandler}
        >
          <div className={css.itemLabelContainer}>
            <img src={itemIconURL} alt="CoinIcon" className={css.icon} />
            <span>{ticker}</span>
          </div>
          <span> | </span>
          <div>Total Value: {totalItemValue}</div>
          <span> | </span>
          <div>Total Amount: {totalItemAmount}</div>
          <span> | </span>
          <div>Lots: {numLots}</div>
        </div>
        {this.state.showLots && <CoinLots lots={lots} />}
      </Fragment>
    );
  }
}

export default PortfolioItem;
