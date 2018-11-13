import React, { Component, Fragment } from 'react';
import css from './Slider.scss';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions';

class Slider extends Component {
  state = {
    email: '',
    username: '',
    passwordOne: '',
    passwordTwo: '',
    terms: false
  };

  validateEmail = input => {
    // validate email
  };

  validatePasswords = (passwordOne, passwordTwo) => {
    this.setState(prevState => {
      if (prevState.passwordOne !== passwordOne) {
        return { passwordOne };
      } else if (prevState.passwordTwo !== passwordTwo) {
        return { passwordTwo };
      }
    });
    console.log('one', passwordOne, 'two', passwordTwo);
  };

  validate;

  render() {
    const { showMenu, isLoggedIn = false } = this.props; // TODO auth in redux
    const menuSliderStyle = showMenu
      ? [css.menuModal, css.Open]
      : [css.menuModal, css.Close];

    const amountChangeHandler = input => {
      //console.log('From: ' + input.name, input.value);
    };

    const registerUser = event => {
      event.preventDefault();
      //const {}
      console.log(event.target);
    };

    return (
      <Fragment>
        <div
          onClick={this.props.toggleMenu}
          className={showMenu ? css.backgroundShadow : null}
        >
          <div
            onClick={this.props.toggleMenu}
            className={menuSliderStyle.join(' ')}
          >
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
                  onSubmit={event => registerUser(event)}
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
                      onChange={input =>
                        this.validatePasswords(
                          input.target.value,
                          this.state.passwordTwo
                        )
                      }
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
                      onChange={input =>
                        this.validatePasswords(
                          this.state.passwordOne,
                          input.target.value
                        )
                      }
                    />
                  </label>
                  <label>
                    Terms and Conditions:
                    <input
                      className={
                        // renderPriceRequire
                        //   ? [css.addFormInput, css.requiredBorder].join(' ')
                        //   : css.addFormInput
                        css.addFormInput
                      }
                      type="checkbox"
                      value={this.state.terms}
                      name="terms"
                      onChange={input =>
                        this.setState({ terms: input.target.value })
                      }
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
  }
}

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
