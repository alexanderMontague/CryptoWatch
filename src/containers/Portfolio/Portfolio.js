import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/SectionHeader/Header';
import PortfolioHeader from '../../components/PortfolioHeader/PortfolioHeader';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';

class Portfolio extends Component {
  state = {
    portfolio: this.props.portfolio,
    totalValue: 0.0
  };

  // TODO db stuff
  loadPortfolioGains = () => {};
  setPortfolioValue = totalValue => {};

  renderPortfolioItems = () => {
    const { portfolio } = this.props;
    return Object.keys(portfolio).map(portfolioCoinItem => {
      const { ticker, imageURL, lots } = portfolio[portfolioCoinItem];
      return (
        <PortfolioItem
          itemIconURL={imageURL}
          ticker={ticker}
          lots={lots}
          key={ticker}
        />
      );
    });
  };

  render() {
    return (
      <Fragment>
        <Header title="Portfolio" />
        <PortfolioHeader totalValue={this.state.totalValue} />
        {this.renderPortfolioItems()}
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
