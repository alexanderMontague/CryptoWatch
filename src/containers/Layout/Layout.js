import React, { Component } from 'react';
import css from './Layout.scss';
import axios from 'axios';

import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';

import AppBar from '../../components/AppBar/AppBar';
import MenuSlider from '../../components/Slider/Slider';
import Portfolio from '../Portfolio/Portfolio';
import Search from '../Search/Search';
import Details from '../Details/Details';

class Layout extends Component {
  state = {
    showDetails: false,
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
    }
  };

  componentDidMount() {
    // Get list of all coins from API
    axios
      .get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => {
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
    if (this.props.selectedCoin !== prevProps.selectedCoin) {
      this.setState({ showDetails: false });
    }
  }

  getCoinDetails = () => {
    // check if coin is already in portfolio on submit
    // if true, show details. if false, show detailsAdd
    if (this.props.selectedCoin) {
      this.setState({ showDetails: true });
    }
  };

  render() {
    return (
      <div className={css.appWrapper}>
        <MenuSlider />
        <AppBar toggleMenu={this.props.toggleMenu} />
        <div className={css.mainContainer}>
          <div className={css.portfolioContainer}>
            <Portfolio />
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
    showMenu: state.showMenu,
    selectedCoin: state.selectedCoin
  };
};

// Condensed version of MDTP
const mapDispatchToProps = {
  toggleMenu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
