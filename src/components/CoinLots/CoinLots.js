import React from 'react';
import css from './CoinLots.scss';

import CoinLotItem from '../CoinSingleLot/CoinLot';

const CoinLots = props => {
  const coinLotArray = props.lots.map((lotDetails, index) => {
    return (
      <CoinLotItem {...lotDetails} key={lotDetails.dateBought} index={index} />
    );
  });

  return (
    <div className={css.lotsMainContainer}>
      <div className={css.lotsHeader}>Lots</div>
      <div className={css.lotsTitleHeaders}>
        <span className={css.headerItem}>Date:</span>
        <span className={css.headerItem}>Value:</span>
        <span className={css.headerItem}>Amount:</span>
        <span className={css.headerItem}>Gain:</span>
      </div>
      {coinLotArray}
    </div>
  );
};

export default CoinLots;
