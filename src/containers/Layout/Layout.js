import React, { Component } from 'react';
import css from './Layout.scss';
import axios from 'axios';

import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';

import AppBar from '../../components/AppBar/AppBar';
import MenuModal from '../../components/Slider/Slider';
import Portfolio from '../../components/Portfolio/Portfolio';
import Search from '../Search/Search';
import Details from '../Details/Details';

class Layout extends Component {

  state = {
    showDetails: false
  }

  // DEV BELOW
  mockRes = {
    "BTC": {
      "Id":"1182",
      "ImageUrl":"/media/19633/btc.png",
      "Name":"BTC",
      "Symbol":"BTC",
      "CoinName":"Bitcoin",
      "FullName":"Bitcoin (BTC)",
      "Algorithm":"SHA256",
    },
    "ETH": {
      "Id":"1182",
      "ImageUrl":"/media/19633/eth.png",
      "Name":"ETH",
      "Symbol":"ETH",
      "CoinName":"Ethereum",
      "FullName":"Ethereum (ETH)",
    },"LTC": {
      "Id":"1182",
      "ImageUrl":"/media/19633/ltc.png",
      "Name":"LTC",
      "Symbol":"LTC",
      "CoinName":"Litecoin",
      "FullName":"Litecoin (LTC)",
      "Algorithm":"SHA256",
    },
  }

  componentDidMount() {
    // Get list of all coins from API
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => {
        const totalCoinsObject = response.data.Data;
        const coinKeyArray = Object.keys(totalCoinsObject);
        this.setState({ coinObject: totalCoinsObject, coinKeys: coinKeyArray });        
      })
      .catch(error => {
        // DEV BELOW
        const totalCoinsObject = this.mockRes;
        const coinKeyArray = Object.keys(totalCoinsObject);
        this.setState({ coinObject: totalCoinsObject, coinKeys: coinKeyArray });
        // ^^^
        console.log('Get Coinlist Error', error);
      });
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedCoin !== prevProps.selectedCoin) {
      this.setState({ showDetails: false });
    }
  }

  getCoinDetails = () => {
    this.setState({ showDetails: true });
  }

  render() {
    return (
      <div className={css.appWrapper}>
        <MenuModal />
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
    )
  }
}

const mapStateToProps = state => {
  return { 
    showMenu: state.showMenu,
    selectedCoin: state.selectedCoin
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    toggleMenu: () => dispatch(toggleMenu()),
    // 
    // sendParamFunc: param => dispatch(sendParamAction(param))
    // wherever sendParamFunc is used, pass same param to it Ex. sendParamFunc(param)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
