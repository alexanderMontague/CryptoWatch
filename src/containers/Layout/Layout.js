import React, { Component, Fragment } from 'react';
import css from './Layout.scss';

import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';

import AppBar from '../../components/AppBar/AppBar';
import MenuModal from '../../components/Slider/Slider';
import Portfolio from '../../components/Portfolio/Portfolio';
import Search from '../Search/Search';
import Details from '../Details/Details';

class Layout extends Component {

  state = {
    coinObject: {},
    coinKeys: []
  }

  getCoinDetails = () => {
    console.log(this.props.selectedCoin);
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
              <Search handleSubmit={this.getCoinDetails}/>
            </div>
            <div className={css.detailsContainer}>
              <Details />
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
