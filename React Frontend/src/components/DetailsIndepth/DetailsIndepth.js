import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import css from './DetailsIndepth.scss';
import { formatPrice } from '../../helpers';
import { getCoinFullInfo } from '../../helpers/requests';
import Chart from '../Chart';
import ToggleButton from 'react-toggle-button';
import Loader from 'react-loader-spinner';

const DetailsIndepth = props => {
  const [coinData, setCoinData] = useState(null);
  const [showGraph, toggleGraph] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('day');

  // fetch coin details when selected coin changes
  useEffect(() => {
    const { selectedCoin, baseCurrency } = props;
    getCoinFullInfo(selectedCoin, baseCurrency).then(res => {
      if (res !== null) {
        setCoinData(res);
      }
    });
  }, [props.selectedCoin]);

  const {
    addAnotherLot,
    coinDetails: { coinImageURL, coinFullName, coinPrice },
    baseCurrency,
    selectedCoin
  } = props;

  const thumbStyle = {
    borderRadius: 5,
    border: '1px solid #616161',
    left: '5px'
  };
  const buttonStyle = {
    borderRadius: 5,
    border: '2px solid #616161',
    height: '25px',
    width: '58px'
  };
  const toggleColors = {
    active: {
      base: '#64B5F6',
      hover: '#2196F3'
    }
  };

  const showGraphHandler = () => {
    toggleGraph(!showGraph);
  };

  const chartPeriodHandler = e => {
    setChartPeriod(e.target.id);
  };

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
          <img className={css.coinIcon} src={coinImageURL} alt="Coin Icon" />
          <div>{coinFullName}</div>
        </div>
        <div className={css.addToggleCoinContainer}>
          <div className={css.buttonContainers}>
            <h6 style={{ paddingBottom: '2px' }}>Toggle Graph: </h6>
            <ToggleButton
              value={showGraph}
              colors={toggleColors}
              thumbStyle={thumbStyle}
              trackStyle={buttonStyle}
              onToggle={showGraphHandler}
            />
          </div>
          <div className={css.buttonContainers}>
            <h6 style={{ paddingBottom: '2px' }}>Add another lot: </h6>
            <button className={css.addButton} onClick={addAnotherLot}>
              ADD
            </button>
          </div>
        </div>
      </div>
      {showGraph ? (
        <Fragment>
          <Chart
            id="cryptoChart"
            width="100%"
            fsym={selectedCoin}
            tsym={baseCurrency}
            span={chartPeriod}
            borderColor="#64b5f6"
          />
          <div className={css.chartButtonContainer}>
            <button
              id="day"
              className={[
                css.chartButton,
                chartPeriod === 'day' && css.active
              ].join(' ')}
              onClick={chartPeriodHandler}
            >
              Day
            </button>
            <button
              id="week"
              className={[
                css.chartButton,
                chartPeriod === 'week' && css.active
              ].join(' ')}
              onClick={chartPeriodHandler}
            >
              Week
            </button>
            <button
              id="month"
              className={[
                css.chartButton,
                chartPeriod === 'month' && css.active
              ].join(' ')}
              onClick={chartPeriodHandler}
            >
              Month
            </button>
            <button
              id="year"
              className={[
                css.chartButton,
                chartPeriod === 'year' && css.active
              ].join(' ')}
              onClick={chartPeriodHandler}
            >
              Year
            </button>
            <button
              id="all"
              className={[
                css.chartButton,
                chartPeriod === 'all' && css.active
              ].join(' ')}
              onClick={chartPeriodHandler}
            >
              All
            </button>
          </div>
        </Fragment>
      ) : coinData === null ? (
        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
          <Loader type="Oval" color="#64b5f6" height="75" width="75" />
        </div>
      ) : (
        <div className={css.detailInfoRow}>
          <div className={css.detailInfo}>
            <div className={css.label}>Current Price:</div>{' '}
            <div>${formatPrice(coinPrice)}</div>
          </div>

          <div className={css.detailInfo}>
            <div className={css.label}>Market Cap:</div>{' '}
            <div>${formatPrice(coinData.MKTCAP)}</div>
          </div>

          <div className={css.detailInfo}>
            <div className={css.label}>24hr Gain:</div>
            <div>
              {coinData.CHANGE24HOUR < 0 ? ' -$' : ' +$'}
              {formatPrice(Math.abs(coinData.CHANGE24HOUR))}
            </div>
          </div>

          <div className={css.detailInfo}>
            <div className={css.label}>24hr Volume:</div>
            <div>
              ({(coinData || {}).fromSymbol})
              {(coinData.VOLUME24HOUR || 0).toFixed(8)}
            </div>
          </div>

          <div className={css.detailInfo}>
            <div className={css.label}>Circulating Supply:</div>
            <div>
              ({(coinData || {}).fromSymbol}){formatPrice(coinData.SUPPLY)}
            </div>
          </div>
        </div>
      )}
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
