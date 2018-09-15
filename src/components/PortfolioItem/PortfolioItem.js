import React from 'react';
import css from './PortfolioItem.scss';

const PortfolioItem = props => {
  return (
    <div className={css.portfolioItemContainer}>
      <div>Icon</div>
      <span> | </span>
      <div>Value:</div>
      <span> | </span>
      <div>Lots:</div>
      <span> | </span>
      <div>Gain%</div>
    </div>
  );
};

export default PortfolioItem;
