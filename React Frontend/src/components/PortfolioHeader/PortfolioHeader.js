import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import css from './PortfolioHeader.scss';

import { formatPrice } from '../../helpers';
import { seeUserReq } from '../../helpers/requests';

import Loader from 'react-loader-spinner';

const PortfolioHeader = props => {
  // const { totalValue } = props;
  // const [isTotalValLoading, updateIsTotalValLoading] = useState(false);

  // async function getUserReq() {
  //   return (await seeUserReq()).data.isAuthenticated;
  // }

  // useEffect(() => {
  //   getUserReq().then(res => {
  //     if (isTotalValLoading !== isValLoading) {
  //       updateIsTotalValLoading(res);
  //     }
  //   });
  // }, [isTotalValLoading]);

  return (
    <div className={css.portfolioHeaderContainer}>
      <span className={css.headerItem}>
        <div className={css.headerTitle}>Total Portfolio Value</div>
        <div className={css.portfolioValue}>
          {totalValue === 0 && isTotalValLoading ? (
            <Loader type="Oval" color="#64b5f6" height="40" width="40" />
          ) : (
            `$${formatPrice(totalValue)}`
          )}
        </div>
      </span>
      <span className={css.headerItem}>
        <div className={css.headerTitle}>24hr Change</div>
        <div className={css.dayPercentChange}>+ $5.00 (3.56%)</div>
      </span>
      <span className={css.headerItem}>
        <div className={css.headerTitle}>Total Portfolio Gain</div>
        <div className={css.totalPortfolioGain}>- $10.45 (-12.69%)</div>
      </span>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default connect(mapStateToProps)(PortfolioHeader);
