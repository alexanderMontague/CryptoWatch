import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import css from './Portfolio.scss';

import Header from '../../components/SectionHeader/Header';
import PortfolioHeader from '../../components/PortfolioHeader/PortfolioHeader';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';

class Portfolio extends Component {
  state = {};

  renderPortfolioItems = () => {
    const { portfolio } = this.props;

    return Object.keys(portfolio).map(portfolioCoin => {
      if (
        !['historicTotalValue', 'currentTotalValue'].includes(portfolioCoin)
      ) {
        const { ticker, imageURL, lots } = portfolio[portfolioCoin];
        return (
          <PortfolioItem
            itemIconURL={imageURL}
            ticker={ticker}
            lots={lots}
            key={ticker}
          />
        );
      }
    });
  };

  render() {
    const { currentPortfolioValue, isAuthenticated, portfolio } = this.props;
    delete portfolio.currentPortfolioValue;
    delete portfolio.historicTotalValue;

    const currentTotalValue = isAuthenticated
      ? currentPortfolioValue
      : Object.keys(portfolio).reduce((totalVal, coin) => {
          if (coin !== 'historicTotalValue' || 'currentTotalValue') {
            return (
              totalVal +
              portfolio[coin].currentPrice * portfolio[coin].totalCoinAmount
            );
          }
        }, 0);

    return (
      <Fragment>
        <Header title="Portfolio" />
        <PortfolioHeader totalValue={currentTotalValue} />
        <div className={css.scrollBox}>{this.renderPortfolioItems()}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.tradeState.portfolio,
    currentPortfolioValue: state.tradeState.portfolio.currentTotalValue,
    isAuthenticated: state.authState.isAuthenticated
  };
};

export default connect(mapStateToProps)(Portfolio);
