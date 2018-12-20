import React, { Component, Fragment } from 'react';
import css from './Slider.scss';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions/interfaceActions';
import axios from 'axios';
import { encodeBase64 } from '../../helpers';
import { deleteAllUsers, savePortfolio } from '../../helpers/requests';

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
    this.setState({ email: input.value });
  };

  updatePasswords = (passwordOne, passwordTwo) => {
    this.setState(prevState => {
      if (prevState.passwordOne !== passwordOne) {
        return { passwordOne };
      } else if (prevState.passwordTwo !== passwordTwo) {
        return { passwordTwo };
      }
    });
    // do a passwords must match l8r
    // maybe enforce password rules
  };

  seeReq = () => {
    axios
      .get('http://localhost:3003/api/v1/public/seeReq', {
        withCredentials: true,
        credentials: 'include'
      })
      .then(res => {
        console.log('REQ: ', res.data);
      });
  };

  async savePortfolioHandler() {
    const res = await savePortfolio(this.props.portfolio);
    console.log(res);
  }

  registerUser = event => {
    event.preventDefault();
    const { email, username, passwordOne, passwordTwo, terms } = this.state;
    const { portfolio } = this.props;
    // encode register params
    const registerObject = encodeBase64({
      email,
      username,
      passwordOne,
      passwordTwo,
      terms,
      portfolio
    });

    console.log('wrong register!');
    // registerUser(registerObject)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {});
  };

  render() {
    const { showMenu, isLoggedIn = false } = this.props; // TODO auth in redux
    const menuSliderStyle = showMenu
      ? [css.menuModal, css.Open]
      : [css.menuModal, css.Close];

    const amountChangeHandler = input => {
      //console.log('From: ' + input.name, input.value);
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
                {/* <form
                  className={css.addCoinForm}
                  onSubmit={event => this.registerUser(event)}
                >
                  <label>
                    Email:
                    <input
                      type="text"
                      placeholder="Enter an Email"
                      name="email"
                      onChange={input => this.validateEmail(input.target)}
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
                      onChange={input =>
                        this.setState({ username: input.target.value })
                      }
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
                        this.setState({ passwordOne: input.target.value })
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
                        this.setState({ passwordTwo: input.target.value })
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
                      onClick={() =>
                        this.setState({ terms: !this.state.terms })
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
                </form> */}
                <div>
                  <button
                    className={css.reqButton}
                    onClick={() => {
                      this.seeReq();
                    }}
                  >
                    See req object
                  </button>

                  <button
                    className={css.portButton}
                    onClick={() => {
                      this.savePortfolioHandler();
                    }}
                  >
                    Save Portfolio
                  </button>

                  <button
                    className={css.delButton}
                    onClick={() => {
                      // DELETE ASAP. ONLY FOR DEV WORK
                      deleteAllUsers();
                    }}
                  >
                    DELETE ALL USERS FROM DB. SERIOUSLY.
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMenu: state.interfaceState.showMenu,
    portfolio: state.tradeState.portfolio
  };
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
