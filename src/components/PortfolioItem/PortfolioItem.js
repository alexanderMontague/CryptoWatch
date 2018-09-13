import React from 'react';
import css from './PortfolioItem.scss';

const PortfolioItem = props => {
  return (
    <div className={css.portfolioItemContainer}>
      <span>Icon</span>
      <span>Total Value</span>
      <span>Total Lots</span>
      <span>Gain%</span>
    </div>
  );
};

export default PortfolioItem;
