import React from 'react';
import css from './CoinLot.scss';
import moment from 'moment';

const CoinLot = props => {
  const { dateBought, priceBought, amountBought, totalLotWorth } = props;
  return (
    <div className={css.lotItemContainer}>
      <div>Date Added: {moment.unix(dateBought).format('MM/DD/YYYY')}</div>
      <span> | </span>
      <div>Value: {priceBought}</div>
      <span> | </span>
      <div>Amount: {amountBought}</div>
      <span> | </span>
      <div>Day Gain: WIP</div>
    </div>
  );
};

export default CoinLot;
