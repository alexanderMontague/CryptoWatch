import React, { Component } from 'react';
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.isAuthenticated === true &&
      this.props.isAuthenticated === false
    ) {
      this.setState({ isPortfolioLoading: false });
    }
  }

  render() {
    const {
      portfolio,
      totalValue,
      portfolioHistoricTotalValue,
      portfolioCurrentTotalValue,
      isAuthenticated
    } = this.props;
    const { isPortfolioLoading } = this.state;

    const portfolio24HourDollarChange = Object.keys(portfolio)
      .filter(coin => coin !== 'meta')
      .reduce((total24HourChange, coin) => {
        return total24HourChange + portfolio[coin].change24HourDollar;
      }, 0);

    const portfolio24HourPercentChange =
      (portfolio24HourDollarChange / totalValue) * 100;

    let dailyChangeColor = 'black';
    if (portfolio24HourDollarChange > 0) {
      dailyChangeColor = 'green';
    } else if (portfolio24HourDollarChange < 0) {
      dailyChangeColor = 'red';
    }

    const portfolioGainDollar =
      Number(portfolioCurrentTotalValue) - Number(portfolioHistoricTotalValue);
    const portfolioGainPercent =
      ((Number(portfolioCurrentTotalValue) -
        Number(portfolioHistoricTotalValue)) /
        Number(portfolioHistoricTotalValue)) *
      100;

    let gainColor = 'black';
    if (portfolioGainDollar > 0) {
      gainColor = 'green';
    } else if (portfolioGainDollar < 0) {
      gainColor = 'red';
    }

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
          <div className={css.dayPercentChange}>
            {isPortfolioLoading && totalValue === 0 ? (
              <Loader type="Oval" color="#64b5f6" height="20" width="20" />
            ) : isAuthenticated ? (
              <span style={{ color: dailyChangeColor }}>
                {portfolio24HourDollarChange < 0 ? '- $' : '+ $'}
                {formatPrice(Math.abs(portfolio24HourDollarChange))} (
                {(portfolio24HourPercentChange || 0).toFixed(2)}%)
              </span>
            ) : (
              'Create an account to view 24hr change!'
            )}
          </div>
        </span>
        <span className={css.headerItem}>
          <div className={css.headerTitle}>Total Portfolio Gain</div>
          <div className={css.totalPortfolioGain}>
            {isPortfolioLoading && totalValue === 0 ? (
              <Loader type="Oval" color="#64b5f6" height="20" width="20" />
            ) : (
              <span style={{ color: gainColor }}>
                {portfolioGainDollar < 0 ? '- $' : '+ $'}
                {formatPrice(Math.abs(portfolioGainDollar))} (
                {(portfolioGainPercent || 0).toFixed(2)}%)
              </span>
            )}
          </div>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.tradeState.portfolio,
  portfolioHistoricTotalValue:
    state.tradeState.portfolio.meta.historicTotalValue,
  portfolioCurrentTotalValue: state.tradeState.portfolio.meta.currentTotalValue,
  isAuthenticated: state.authState.isAuthenticated
});

export default connect(mapStateToProps)(PortfolioHeader);
