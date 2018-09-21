import React from 'react';
import css from './CoinLot.scss';
import moment from 'moment';

const CoinLot = props => {
  const { dateBought, priceBought, amountBought, totalLotWorth, index } = props;

  let lotStyle =
    index % 2 === 0
      ? css.lotItemContainer
      : [css.lotItemContainer, css.oddRow].join(' ');

  return (
    <div className={lotStyle}>
      <div className={css.lotItem}>
        {moment.unix(dateBought).format('MM/DD/YYYY')}
      </div>
      <div className={css.lotItem}>{`$${priceBought}`}</div>
      <div className={css.lotItem}>{amountBought}</div>
      <div className={css.lotItem}>WIP</div>
    </div>
  );
};

export default CoinLot;
