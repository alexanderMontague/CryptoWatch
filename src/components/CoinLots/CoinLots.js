import React from 'react';
import css from './CoinLots.scss';

const CoinLots = props => {
  return (
    <div className={css.lotsMainContainer}>
      <div className={css.lotsHeader}>Lots</div>
      <div className={css.lotItemContainer}>
        <div>Date Added: ----</div>
        <span> | </span>
        <div>Total Value: ----</div>
        <span> | </span>
        <div>Total Amount: ----</div>
        <span> | </span>
        <div>Lots: ----</div>
      </div>
    </div>
  );
};

export default CoinLots;
