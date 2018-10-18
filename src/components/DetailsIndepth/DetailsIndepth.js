import React from 'react';
import css from './DetailsIndepth.scss';
import { numberWithCommas } from '../../helpers';

import ToggleButton from 'react-toggle-button';

const DetailsIndepth = props => {
  const {
    showGraph,
    baseCurrency,
    addAnotherLot,
    coinDetails: { coinImageURL, coinFullName, coinPrice }
  } = props;

  const thumbStyle = {
    borderRadius: 5,
    border: '1px solid #616161',
    left: '5px'
  };
  const buttonStyle = {
    borderRadius: 5,
    border: '2px solid #616161'
  };
  const toggleColors = {
    active: {
      base: '#64B5F6',
      hover: '#2196F3'
    }
  };

  return (
    <div className={css.detailsContentContainer}>
      <div className={css.detailHeaderRow}>
        <div className={css.selectedCurrency}>
          Base:
          {<br />}
          CAD
        </div>
        <div className={css.coinNameContainer}>
          <div className={css.imageContainer}>
            <img className={css.coinIcon} src={coinImageURL} alt="Coin Icon" />
          </div>
          <div>{coinFullName}</div>
        </div>
        <div className={css.addToggleCoinContainer}>
          <div className={css.buttonContainers}>
            <h6>Toggle Graph: </h6>
            <ToggleButton
              value={showGraph}
              colors={toggleColors}
              thumbStyle={thumbStyle}
              trackStyle={buttonStyle}
              onToggle={showGraph => {
                // showGraph toggle
                console.log('toggle!');
              }}
            />
          </div>
          <div className={css.buttonContainers}>
            <h6>Add another lot: </h6>
            <button className={css.addButton} onClick={addAnotherLot}>
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className={css.detailInfoRow}>
        <div className={css.coinInfoRow}>
          <span>Price: {numberWithCommas(coinPrice.toFixed(2))}</span>
          <span>Market Cap: ___</span>
        </div>
        <div className={css.coinInfoRow}>
          <span>24hr Change: ___</span>
          <span>Volume: ___</span>
        </div>
        <div className={css.coinInfoRow}>
          <span>Coin Ranking: ___</span>
        </div>
      </div>
    </div>
  );
};

DetailsIndepth.propTypes = {};

export default DetailsIndepth;
