import React, { Component, Fragment } from 'react';
import css from './Layout.scss';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';
import AppBar from '../../components/AppBar/AppBar';
import MenuModal from '../../components/Slider/Slider';

class Layout extends Component {

  render() {
    return (
      <div className={css.appWrapper}>
        <MenuModal />
        <AppBar toggleMenu={this.props.toggleMenu} />
        <div className={css.mainContainer}>
          <div>Portfolio Section</div>
          <div>
            <div>Search Section</div>
            <div>Details Section</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    showMenu: state.showMenu,
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
