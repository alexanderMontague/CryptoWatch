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
      if (portfolioCoin !== 'meta') {
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
    const { portfolioMetaData, isAuthenticated, portfolio } = this.props;

    const currentTotalValue = isAuthenticated
      ? portfolioMetaData.currentTotalValue
      : Object.keys(portfolio).reduce((totalVal, coin) => {
          if (coin !== 'meta') {
            return (
              totalVal +
              portfolio[coin].currentPrice * portfolio[coin].totalCoinAmount
            );
          }

          return totalVal;
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
    portfolioMetaData: state.tradeState.portfolio.meta,
    isAuthenticated: state.authState.isAuthenticated
  };
};

export default connect(mapStateToProps)(Portfolio);
