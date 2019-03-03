import React from 'react';
import css from './CoinLots.scss';

import CoinLotItem from '../CoinSingleLot/CoinLot';

const CoinLots = props => {
  const { lots, ticker } = props;
  const coinLotArray = lots.map((lotDetails, index) => {
    return (
      <CoinLotItem
        {...lotDetails}
        ticker={ticker}
        key={lotDetails.dateBought}
        index={index}
      />
    );
  });

  return (
    <div className={css.lotsMainContainer}>
      <div className={css.lotsTitleHeaders}>
        <span className={css.headerItem}>Date:</span>
        <span className={css.headerItem}>Bought At:</span>
        <span className={css.headerItem}>Amount:</span>
        <span className={css.headerItem}>Gain:</span>
      </div>
      {coinLotArray}
    </div>
  );
};

export default CoinLots;
