import React, { Component } from 'react';
import css from './Layout.scss';
import { connect } from 'react-redux';
import { isInPortfolio } from '../../helpers';
import { getCoinList } from '../../helpers/requests';

import { showDetails, hideDetails } from '../../actions/tradeActions';
import { toggleMenu } from '../../actions/interfaceActions';
import { logoutUser, getUserStatus } from '../../actions/authActions';

import AppBar from '../../components/AppBar/AppBar';
import MenuSlider from '../Slider/Slider';
import Portfolio from '../Portfolio/Portfolio';
import Search from '../Search/Search';
import Details from '../Details/Details';
import LoginModal from '../LoginModal';

class Layout extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    // Get list of all coins from API
    getCoinList()
      .then(response => {
        if (response.error) {
          console.error('GET Coin List Error: ', response.error);
          return;
        }

        const totalCoinsObject = response.data.Data;
        const coinKeyArray = Object.keys(totalCoinsObject);
        this.setState({
          coinObject: totalCoinsObject,
          coinKeys: coinKeyArray,
          isLoading: false
        });
      })
      .catch(error => {
        console.error('Get Coinlist Error', error.message);
      });

    // if user is logged in, load their portfolio data
    this.props.getUserStatus();
  }

  componentDidUpdate(prevProps) {
    const { selectedCoin, portfolio } = this.props;
    if (selectedCoin !== prevProps.selectedCoin) {
      this.setState({ inPortfolio: isInPortfolio(portfolio, selectedCoin) });
    }
  }

  getCoinDetails = () => {
    const { selectedCoin, portfolio, showDetails } = this.props;
    if (selectedCoin) {
      const inPortfolio = isInPortfolio(portfolio, selectedCoin);
      // when the search button is pressed, show the details section (details add or indepth details)
      // then set whether the coin is in the portfolio or not
      this.setState({ inPortfolio });
      showDetails();
    }
  };

  addAnotherLot = () => {
    // when a user wants to add another lot on the more details screen, go back to add details section
    this.setState({ inPortfolio: false });
  };

  showDetailsInDepth = () => {
    // as soon as the user submits, show the more details section
    this.setState({ inPortfolio: true });
  };

  render() {
    return (
      <div className={css.appWrapper}>
        <LoginModal />
        <MenuSlider />
        <AppBar toggleMenu={this.props.toggleMenu} />
        <div className={css.mainContainer}>
          <div className={css.portfolioContainer}>
            <Portfolio portfolio={this.props.portfolio} />
          </div>
          <div className={css.rightSideContainer}>
            <div className={css.searchContainer}>
              <Search
                handleSubmit={this.getCoinDetails}
                coinObject={this.state.coinObject}
                coinKeys={this.state.coinKeys}
                isLoading={this.state.isLoading}
              />
            </div>
            <div className={css.detailsContainer}>
              <Details
                selectedCoin={this.props.selectedCoin}
                showDetails={this.state.showDetails}
                coinObject={this.state.coinObject}
                inPortfolio={this.state.inPortfolio}
                addAnotherLot={this.addAnotherLot}
                showDetailsInDepth={this.showDetailsInDepth}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMenu: state.interfaceState.showMenu,
    selectedCoin: state.tradeState.selectedCoin,
    portfolio: state.tradeState.portfolio
  };
};

// Condensed version of MDTP
const mapDispatchToProps = {
  toggleMenu,
  showDetails,
  hideDetails,
  logoutUser,
  getUserStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
