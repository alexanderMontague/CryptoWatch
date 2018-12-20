import React from 'react';
import css from './CoinLot.scss';
import moment from 'moment';

import { formatPrice } from '../../helpers';

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
      <div className={css.lotItem}>{`$${formatPrice(priceBought)}`}</div>
      <div className={css.lotItem}>{parseFloat(amountBought).toFixed(8)}</div>
      <div className={css.lotItem}>WIP</div>
    </div>
  );
};

export default CoinLot;
