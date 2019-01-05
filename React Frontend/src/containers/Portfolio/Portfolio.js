import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import css from './Portfolio.scss';

import { getHistoricPortfolioValue } from '../../helpers';

import Header from '../../components/SectionHeader/Header';
import PortfolioHeader from '../../components/PortfolioHeader/PortfolioHeader';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';

class Portfolio extends Component {
  state = {
    portfolio: this.props.portfolio,
    totalValue: 0.0
  };

  componentDidUpdate = () => {
    if (this.props.portfolio) {
      const newPortfolio = this.props.portfolio;
      let newTotalValue = getHistoricPortfolioValue(newPortfolio);

      if (this.state.totalValue !== newTotalValue) {
        // if the total value did change, update it
        this.setState({
          portfolio: newPortfolio,
          totalValue: newTotalValue
        });
      }
    }
  };

  renderPortfolioItems = () => {
    const { portfolio } = this.props;
    return Object.keys(portfolio).map(portfolioCoinItem => {
      if (portfolioCoinItem !== 'historicTotalValue') {
        const { ticker, imageURL, lots } = portfolio[portfolioCoinItem];
        return (
          <PortfolioItem
            itemIconURL={imageURL}
            ticker={ticker}
            lots={lots}
            key={ticker}
          />
        );
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Header title="Portfolio" />
        <PortfolioHeader totalValue={this.state.totalValue} />
        <div className={css.scrollBox}>{this.renderPortfolioItems()}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.tradeState.portfolio
  };
};

export default connect(mapStateToProps)(Portfolio);
