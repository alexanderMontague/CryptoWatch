import React, { Component, useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import css from './PortfolioHeader.scss';

import { formatPrice } from '../../helpers';
import { seeUserReq } from '../../helpers/requests';

import Loader from 'react-loader-spinner';

class PortfolioHeader extends Component {
  state = {
    isPortfolioLoading: false
  };

  async componentDidMount() {
    const userData = (await seeUserReq()).data;

    this.setState({
      isPortfolioLoading:
        userData.isAuthenticated &&
        !!userData.portfolio.meta.currentTotalValue !== false
    });
  }

  render() {
    const {
      totalValue,
      portfolioHistoricTotalValue,
      portfolioCurrentTotalValue
    } = this.props;
    const { isPortfolioLoading } = this.state;

    const portfolioGainDollar =
      Number(portfolioCurrentTotalValue) - Number(portfolioHistoricTotalValue);
    const portfolioGainPercent =
      ((Number(portfolioCurrentTotalValue) -
        Number(portfolioHistoricTotalValue)) /
        Number(portfolioHistoricTotalValue)) *
      100;

    return (
      <div className={css.portfolioHeaderContainer}>
        <span className={css.headerItem}>
          <div className={css.headerTitle}>Total Portfolio Value</div>
          <div className={css.portfolioValue}>
            {isPortfolioLoading && totalValue === 0 ? (
              <Loader type="Oval" color="#64b5f6" height="20" width="20" />
            ) : (
              `$${formatPrice(totalValue)}`
            )}
          </div>
        </span>
        <span className={css.headerItem}>
          <div className={css.headerTitle}>24hr Change</div>
          <div className={css.dayPercentChange}>+ $5.00 (3.56%)</div>
        </span>
        <span className={css.headerItem}>
          <div className={css.headerTitle}>Total Portfolio Gain</div>
          <div className={css.totalPortfolioGain}>
            {isPortfolioLoading && totalValue === 0 ? (
              <Loader type="Oval" color="#64b5f6" height="20" width="20" />
            ) : (
              <Fragment>
                {portfolioGainDollar < 0 ? '- ' : '+ '}
                {formatPrice(Math.abs(portfolioGainDollar))} (
                {(portfolioGainPercent || 0).toFixed(2)}%)
              </Fragment>
            )}
          </div>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  portfolioHistoricTotalValue:
    state.tradeState.portfolio.meta.historicTotalValue,
  portfolioCurrentTotalValue: state.tradeState.portfolio.meta.currentTotalValue
});

export default connect(mapStateToProps)(PortfolioHeader);
