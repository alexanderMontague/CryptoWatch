import React from 'react';
import css from './PortfolioItem.scss';

const PortfolioItem = props => {
  const { itemIconUrl, ticker, lots } = props;

  return (
    <div className={css.portfolioItemContainer}>
      <div>
        <img src={itemIconUrl} alt="CoinIcon" />
        <span>{ticker}</span>
      </div>
      <span> | </span>
      <div>Total Value: {totalItemValue}</div>
      <span> | </span>
      <div>Total Amount: {totalItemAmount}</div>
      <span> | </span>
      <div>Daily Gain: {itemDailyGain}</div>
    </div>
  );
};

export default PortfolioItem;
