import React from 'react';
import css from './PortfolioItem.scss';

const PortfolioItem = props => {
  const { itemIconURL, ticker, lots } = props;
  let totalItemAmount = 0;
  let totalItemValue = 0;
  let numLots = lots.length;
  lots.map(lot => {
    totalItemAmount += parseFloat(lot.amountBought);
    totalItemValue += parseFloat(lot.totalLotWorth);
  });
  return (
    <div className={css.portfolioItemContainer}>
      <div className={css.itemLabelContainer}>
        <img src={itemIconURL} alt="CoinIcon" className={css.icon} />
        <span>{ticker}</span>
      </div>
      <span> | </span>
      <div>Total Value: {totalItemValue}</div>
      <span> | </span>
      <div>Total Amount: {totalItemAmount}</div>
      <span> | </span>
      <div>Lots: {numLots}</div>
    </div>
  );
};

export default PortfolioItem;
