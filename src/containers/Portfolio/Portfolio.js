import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/SectionHeader/Header';
import PortfolioHeader from '../../components/PortfolioHeader/PortfolioHeader';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';

class Portfolio extends Component {
  render() {
    const { portfolio } = this.props;
    const portfolioItems = Object.keys(portfolio).map(portfolioCoinItem => {
      const { ticker, imageURL, lots } = portfolioCoinItem;
      return (
        <PortfolioItem
          itemIconURL={imageURL}
          ticker={ticker}
          lots={lots}
          key={ticker}
        />
      );
    });
    return (
      <Fragment>
        <Header title="Portfolio" />
        <PortfolioHeader />
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
