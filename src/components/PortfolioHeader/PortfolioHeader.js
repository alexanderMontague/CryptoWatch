import React from 'react';
import css from './PortfolioHeader.scss';

const PortfolioHeader = () => {
  return (
    <div className={css.portfolioHeaderContainer}>
      <span className={css.headerItem}>
        Total Portfolio Value
        <div className={css.portfolioValue}>$VALUE</div>
      </span>
      <span className={css.headerItem}>
        24hr Change
        <div className={css.dayPercentChange}>%VALUE</div>
      </span>
      <span className={css.headerItem}>
        Total Portfolio Gain
        <div className={css.totalPortfolioGain}>$VALUE</div>
      </span>
    </div>
  );
};

export default PortfolioHeader;
