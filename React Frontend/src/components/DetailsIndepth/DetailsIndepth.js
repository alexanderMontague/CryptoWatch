import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import css from './DetailsIndepth.scss';
import { formatPrice } from '../../helpers';
import { getCoinFullInfo } from '../../helpers/requests';

import ToggleButton from 'react-toggle-button';

const DetailsIndepth = props => {
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    const { selectedCoin, baseCurrency } = props;
    getCoinFullInfo(selectedCoin, baseCurrency).then(res => {
      if (res !== null) {
        setCoinData(res);
      }
    });
  }, []);

  const {
    showGraph,
    portfolio,
    addAnotherLot,
    coinDetails: { coinImageURL, coinFullName, coinPrice },
    selectedCoin
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

  const showGraphHandler = () => {};

  const { fromSymbol } = coinData;

  return (
    <div className={css.detailsContentContainer}>
      <div className={css.detailHeaderRow}>
        <div className={css.selectedCurrency}>
          Base:
          {<br />}
          CAD
          {/* CAD {baseCurrency} */}
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
              onToggle={showGraphHandler}
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
        <div>
          <span>Current Price:</span> ${formatPrice(coinPrice)}
        </div>

        <div>
          <span>Market Cap:</span> ${formatPrice(coinData.MKTCAP)}
        </div>

        <div>
          <span>24hr Gain:</span>
          {coinData.CHANGE24HOUR < 0 ? ' -$' : ' +$'}
          {formatPrice(Math.abs(coinData.CHANGE24HOUR))}
        </div>

        <div>
          <span>24hr Volume:</span> {fromSymbol}
          {(coinData.VOLUME24HOUR || 0).toFixed(8)}
        </div>

        <div>
          <span>Circulating Supply:</span> {fromSymbol}
          {coinData.SUPPLY}
        </div>
      </div>
    </div>
  );
};

DetailsIndepth.propTypes = {};

const mapStateToProps = state => ({
  portfolio: state.tradeState.portfolio,
  selectedCoin: state.tradeState.selectedCoin,
  baseCurrency: state.tradeState.baseCurrency
});

export default connect(mapStateToProps)(DetailsIndepth);
