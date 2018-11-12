import React, { Fragment } from 'react';
import css from './Slider.scss';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';

const Slider = props => {
  const { showMenu, isLoggedIn = false } = props; // TODO auth in redux
  const menuSliderStyle = showMenu
    ? [css.menuModal, css.Open]
    : [css.menuModal, css.Close];

  const amountChangeHandler = input => {
    console.log('From: ' + input.name, input.value);
  };

  return (
    <Fragment>
      <div
        onClick={props.toggleMenu}
        className={showMenu ? css.backgroundShadow : null}
      >
        <div onClick={props.toggleMenu} className={menuSliderStyle.join(' ')}>
          {isLoggedIn ? (
            <div className={css.menuLayer}>
              user profile pic
              <button>Settings</button>
              <br />
              <button>TBD</button>
              <br />
              <button>Sign Out</button>
              <br />
            </div>
          ) : (
            <div className={css.menuLayer}>
              <h3>Create an Account!</h3>
              <form
                className={css.addCoinForm}
                onSubmit={() => console.log('submitted')}
              >
                <label>
                  Email:
                  <input
                    type="text"
                    placeholder="Enter an Email"
                    name="email"
                    onChange={input => amountChangeHandler(input.target)}
                    className={
                      // renderPriceRequire
                      //   ? [css.addFormInput, css.requiredBorder].join(' ')
                      //   : css.addFormInput
                      css.addFormInput
                    }
                  />
                </label>
                <label>
                  Username:
                  <input
                    className={
                      // renderPriceRequire
                      //   ? [css.addFormInput, css.requiredBorder].join(' ')
                      //   : css.addFormInput
                      css.addFormInput
                    }
                    type="text"
                    placeholder="Enter a username"
                    name="username"
                    onChange={input => amountChangeHandler(input.target)}
                  />
                </label>
                <label>
                  Password:
                  <input
                    className={
                      // renderPriceRequire
                      //   ? [css.addFormInput, css.requiredBorder].join(' ')
                      //   : css.addFormInput
                      css.addFormInput
                    }
                    type="password"
                    placeholder="Enter a password"
                    name="passwordOne"
                    onChange={input => amountChangeHandler(input.target)}
                  />
                </label>
                <label>
                  Re-enter Password:
                  <input
                    className={
                      // renderPriceRequire
                      //   ? [css.addFormInput, css.requiredBorder].join(' ')
                      //   : css.addFormInput
                      css.addFormInput
                    }
                    type="password"
                    placeholder="Enter same password!"
                    name="passwordTwo"
                    onChange={input => amountChangeHandler(input.target)}
                  />
                </label>
                <button
                  className={css.addButton}
                  type="submit"
                  // disabled={
                  //   renderDateRequire ||
                  //   renderPriceRequire ||
                  //   renderAmountRequire ||
                  //   !dataAvailable
                  // }
                >
                  Register!
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { showMenu: state.showMenu };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(toggleMenu())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
