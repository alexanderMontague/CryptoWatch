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
  componentDidMount = () => {
    // load portfolio from DB
  };
  updatePortfolio = (newPortfolio, newTotalValue) => {
    // update db with new portfolio
    console.log(newPortfolio, newTotalValue);
  };

  componentDidUpdate = () => {
    if (this.props.portfolio) {
      const newPortfolio = this.props.portfolio;
      let newTotalValue = 0;

      for (let coin in newPortfolio) {
        // calculate updated portfolio price
        newPortfolio[coin].lots.forEach(lot => {
          newTotalValue += lot.totalLotWorth;
        });
      }

      if (this.state.totalValue !== newTotalValue) {
        // if the total value did change, update it
        this.setState(() => {
          // setState is async so set db before updating
          this.updatePortfolio(newPortfolio, newTotalValue);
          return {
            portfolio: newPortfolio,
            totalValue: newTotalValue
          };
        });
      }
    }
  };

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
