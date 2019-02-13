import React from 'react';
import { connect } from 'react-redux';
import css from './PortfolioHeader.scss';

import Loader from 'react-loader-spinner';
import { formatPrice } from '../../helpers';

const PortfolioHeader = props => {
  const { totalValue = 0 } = props;

  return (
    <div className={css.portfolioHeaderContainer}>
      <span className={css.headerItem}>
        <div className={css.headerTitle}>Total Portfolio Value</div>
        <div className={css.portfolioValue}>{`$${formatPrice(
          totalValue
        )}`}</div>
      </span>
      <span className={css.headerItem}>
        <div className={css.headerTitle}>24hr Change</div>
        <div className={css.dayPercentChange}>+ $5.00 (3.56%)</div>
      </span>
      <span className={css.headerItem}>
        <div className={css.headerTitle}>Total Portfolio Gain</div>
        <div className={css.totalPortfolioGain}>- $10.45 (-12.69%)</div>
      </span>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default connect(mapStateToProps)(PortfolioHeader);
