import React, { Fragment } from 'react';
import css from './Slider.scss';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';

const Slider = (props) => {

  const { showMenu } = props;
  let menuSliderStyle = [css.menuModal, css.Close];
  
  if(showMenu) {
    menuSliderStyle = [css.menuModal, css.Open];
  }
  return (
    <Fragment>
      <div onClick={props.toggleMenu} className={showMenu ? css.backgroundShadow : null}>
        <div className={menuSliderStyle.join(' ')}>
          <div className={css.menuLayer}>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => {  
  return { showMenu: state.showMenu }
}

const mapDispatchToProps = dispatch => {
  return { 
    toggleMenu: () => dispatch(toggleMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);