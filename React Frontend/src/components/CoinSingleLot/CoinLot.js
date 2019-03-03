import React from 'react';
import { connect } from 'react-redux';
import css from './CoinLot.scss';
import moment from 'moment';

import { formatPrice } from '../../helpers';

const CoinLot = props => {
  const {
    dateBought,
    priceBought,
    amountBought,
    index,
    currentCoinPrice
  } = props;

  const lotGainAmountPercentage =
    ((currentCoinPrice - priceBought) / priceBought) * 100;

  const gainColour = lotGainAmountPercentage < 0 ? 'red' : 'green';

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
      <div className={css.lotItem}>
        <span style={{ color: gainColour }}>
          {lotGainAmountPercentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  currentCoinPrice: state.tradeState.portfolio[ownProps.ticker].currentPrice
});

export default connect(mapStateToProps)(CoinLot);
