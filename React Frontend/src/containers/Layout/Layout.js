import React, { Component } from 'react';
import css from './Layout.scss';
import { connect } from 'react-redux';
import { isInPortfolio } from '../../helpers';
import { getCoinList } from '../../helpers/requests';

import { showDetails, hideDetails } from '../../actions/tradeActions';
import { toggleMenu } from '../../actions/interfaceActions';

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

  // TODO: DELETE AFTER DEV DONE BELOW
  mockRes = {
    BTC: {
      Id: '1182',
      ImageUrl: '/media/19633/btc.png',
      Name: 'BTC',
      Symbol: 'BTC',
      CoinName: 'Bitcoin',
      FullName: 'Bitcoin (BTC)',
      Algorithm: 'SHA256'
    },
    ETH: {
      Id: '1182',
      ImageUrl: '/media/19633/eth.png',
      Name: 'ETH',
      Symbol: 'ETH',
      CoinName: 'Ethereum',
      FullName: 'Ethereum (ETH)'
    },
    LTC: {
      Id: '1182',
      ImageUrl: '/media/19633/ltc.png',
      Name: 'LTC',
      Symbol: 'LTC',
      CoinName: 'Litecoin',
      FullName: 'Litecoin (LTC)',
      Algorithm: 'SHA256'
    },
    CC: {
      Id: '1183',
      Name: 'CC',
      Symbol: 'CC',
      CoinName: 'Crapcoin',
      FullName: 'Crapcoin (CC)'
    }
  };

  componentDidMount() {
    // Get list of all coins from API
    getCoinList()
      .then(response => {
        if (response.error) {
          console.log('GET Coin List Error: ', response.error);
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
        // TODO: DELETE AFTER DEV DONE BELOW
        const totalCoinsObject = this.mockRes;
        const coinKeyArray = Object.keys(totalCoinsObject);
        this.setState({ coinObject: totalCoinsObject, coinKeys: coinKeyArray });
        setTimeout(() => {
          this.setState({ isLoading: false });
        }, 1000);
        console.log('Get Coinlist Error', error);
      });
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
    showMenu: state.tradeState.showMenu,
    selectedCoin: state.tradeState.selectedCoin,
    portfolio: state.tradeState.portfolio
  };
};

// Condensed version of MDTP
const mapDispatchToProps = {
  toggleMenu,
  showDetails,
  hideDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
