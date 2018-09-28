import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/SectionHeader/Header';
import PortfolioHeader from '../../components/PortfolioHeader/PortfolioHeader';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';

class Portfolio extends Component {
  loadPortfolioGains = () => {};

  setPortfolioValue = totalValue => {};

  render() {
    const { portfolio } = this.props;
    let totalValue = 0.0;
    const portfolioItems = Object.keys(portfolio).map(portfolioCoinItem => {
      const { ticker, imageURL, lots } = portfolio[portfolioCoinItem];
      lots.forEach(lot => {
        totalValue += lot.totalLotWorth;
      });
      return (
        <PortfolioItem
          itemIconURL={imageURL}
          ticker={ticker}
          lots={lots}
          key={ticker}
        />
      );
    });
    this.setPortfolioValue(totalValue);

    return (
      <Fragment>
        <Header title="Portfolio" />
        <PortfolioHeader totalValue={totalValue} />
        {portfolioItems}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio
  };
};

export default connect(mapStateToProps)(Portfolio);
