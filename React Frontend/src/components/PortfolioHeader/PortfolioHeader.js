import React from 'react';
import css from './PortfolioHeader.scss';

import { formatPrice } from '../../helpers';

const PortfolioHeader = props => {
  const { totalValue } = props;

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

export default PortfolioHeader;
