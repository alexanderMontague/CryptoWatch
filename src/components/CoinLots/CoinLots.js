import React from 'react';
import css from './CoinLots.scss';

import CoinLotItem from '../CoinSingleLot/CoinLot';

const CoinLots = props => {
  const coinLotArray = props.lots.map(lotDetails => {
    return <CoinLotItem {...lotDetails} key={lotDetails.dateBought} />;
  });

  return (
    <div className={css.lotsMainContainer}>
      <div className={css.lotsHeader}>Lots</div>
      {coinLotArray}
    </div>
  );
};

export default CoinLots;
