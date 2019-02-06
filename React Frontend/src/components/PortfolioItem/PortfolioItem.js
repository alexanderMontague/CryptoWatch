import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import css from './PortfolioItem.scss';

import { selectCoin, showDetails } from '../../actions/tradeActions';
import { formatPrice } from '../../helpers';
import { getCoinPrice } from '../../helpers/requests';
import CoinLots from '../CoinLots/CoinLots';
import chevronIcon from '../../assets/chevron-arrow.png';

class PortfolioItem extends Component {
  state = {
    showLots: false,
    currentCoinPrice: undefined
  };

  async componentDidMount() {
    const { ticker, baseCurrency } = this.props;
    const currentCoinPrice = await getCoinPrice(
      ticker,
      baseCurrency,
      moment().unix()
    );
    this.setState({ currentCoinPrice });
  }

  showLotHandler = () => {
    const { ticker, selectCoin, showDetails } = this.props;
    this.setState({ showLots: !this.state.showLots });
    selectCoin(ticker);
    showDetails();
  };

  render() {
    const { itemIconURL, ticker, lots } = this.props;
    const { currentCoinPrice } = this.state;
    const numLots = lots.length;
    const totalItemAmount = lots.reduce(
      (totalAmount, lot) => totalAmount + Number(lot.amountBought),
      0
    );
    const totalCurrentValue = currentCoinPrice * totalItemAmount;

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
            <div>Current Value:</div>
            <div>{`$${formatPrice(totalCurrentValue)}`}</div>
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

const mapStateToProps = state => ({
  baseCurrency: state.authState.baseCurrency
});

const mapDispatchToProps = {
  selectCoin,
  showDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioItem);
