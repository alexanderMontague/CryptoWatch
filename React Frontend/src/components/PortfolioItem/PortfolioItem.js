import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import css from './PortfolioItem.scss';

import { selectCoin, showDetails } from '../../actions/tradeActions';
import { formatPrice } from '../../helpers';
import CoinLots from '../CoinLots/CoinLots';
import chevronIcon from '../../assets/chevron-arrow.png';

class PortfolioItem extends Component {
  state = {
    showLots: false
  };

  showLotHandler = () => {
    const { ticker, selectCoin, showDetails } = this.props;
    this.setState({ showLots: !this.state.showLots });
    selectCoin(ticker);
    showDetails();
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
          <div className={css.headerItemContainer}>
            <div>Value:</div>
            <div>{`$${formatPrice(totalItemValue)}`}</div>
          </div>
          <div className={css.headerItemContainer}>
            <div>Total Amount: </div>
            <div>{totalItemAmount.toFixed(8)}</div>
          </div>
          <div className={css.headerItemContainer}>
            <div className={css.detailsContainer}>
              <span>Lots: {numLots}</span>
              <img
                className={
                  this.state.showLots ? css.chevronDown : css.chevronUp
                }
                src={chevronIcon}
              />
            </div>
          </div>
        </div>
        {this.state.showLots && <CoinLots lots={lots} />}
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  selectCoin,
  showDetails
};

export default connect(
  null,
  mapDispatchToProps
)(PortfolioItem);
