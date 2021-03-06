import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styles from './styles.scss';

import Loader from 'react-loader-spinner';

import { toggleModal } from '../../actions/interfaceActions';
import {
  registerUser,
  loginUser,
  registerSuccess
} from '../../actions/authActions';
import { encodeBase64 } from '../../helpers';
import { sucessfulRegisterSelector } from '../../selectors';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Input = props => {
  let inputStyles = [styles.inputContainer];
  if (!props.currentVal) {
    inputStyles.push(styles.inputRequired);
  }

  return (
    <label className={styles.inputContainer}>
      <input
        className={inputStyles.join(' ')}
        onChange={props.onChange}
        type={
          props.label.toLowerCase().includes('password') ? 'password' : 'text'
        }
        placeholder={props.label}
        name={props.name}
        value={props.value}
      />
    </label>
  );
};

class LoginModal extends Component {
  state = {
    login: true,
    loginIdentifier: '',
    loginPass: '',
    signupEmail: '',
    signupUsername: '',
    signupPass: '',
    confirmPass: ''
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  handleLogin = event => {
    event.preventDefault();

    const { loginIdentifier, loginPass } = this.state;
    const { loginUser } = this.props;

    const loginObject = encodeBase64({
      identifier: loginIdentifier,
      password: loginPass
    });

    loginUser(loginObject);
  };

  handleRegister = event => {
    event.preventDefault();
    const { signupUsername, signupEmail, signupPass, confirmPass } = this.state;
    const { registerUser, portfolio } = this.props;

    const registerObject = encodeBase64({
      email: signupEmail.toLowerCase(),
      username: signupUsername.toLowerCase(),
      passwordOne: signupPass,
      passwordTwo: confirmPass,
      terms: null, // add checkbox if needed later
      portfolio
    });

    registerUser(registerObject);
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  clearModalInput = () => {
    this.setState({
      loginIdentifier: '',
      loginPass: '',
      signupEmail: '',
      signupUsername: '',
      signupPass: '',
      confirmPass: ''
    });
  };

  render() {
    const {
      registerStatus,
      loginStatus,
      isLoginLoading,
      isAuthenticated,
      toggleModal,
      isRegisterLoading,
      successfulRegister,
      registerSuccess
    } = this.props;
    const {
      loginIdentifier,
      loginPass,
      signupEmail,
      signupUsername,
      signupPass,
      confirmPass
    } = this.state;

    // Register feedback for the user
    let registerMessage = null;
    if (registerStatus.message) {
      registerStatus.error
        ? (registerMessage = (
            <div className={styles.registerError}>{registerStatus.message}</div>
          ))
        : (registerMessage = (
            <div className={styles.registerSuccess}>
              {registerStatus.message}
            </div>
          ));
    }

    // Login feedback for the user
    let loginMessage = null;
    if (loginStatus.message) {
      loginStatus.error
        ? (loginMessage = (
            <div className={styles.registerError}>{loginStatus.message}</div>
          ))
        : (loginMessage = (
            <div className={styles.registerSuccess}>{loginStatus.message}</div>
          ));
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.modalContainer}>
          {this.state.login ? (
            <form
              onSubmit={this.handleLogin}
              className={styles.contentContainer}
            >
              <span className={styles.loginHeader}>{loginMessage}</span>
              {!isAuthenticated && (
                <div>
                  <span className={styles.loginHeader}>Log In</span>
                  <Input
                    onChange={this.handleChange}
                    label="Username or Email"
                    name="loginIdentifier"
                    value={this.state.loginIdentifier}
                    currentVal={this.state.loginIdentifier}
                  />
                  <Input
                    onChange={this.handleChange}
                    label="Password"
                    name="loginPass"
                    value={this.state.loginPass}
                    currentVal={this.state.loginPass}
                  />
                  <div className={styles.lilSpacing}>
                    <span className={styles.signupSpan}>
                      Don't have an account?{' '}
                    </span>
                    <span
                      className={styles.signupLink}
                      onClick={() => {
                        this.setState({
                          login: false
                        });
                        this.clearModalInput();
                      }}
                    >
                      Register
                    </span>
                  </div>
                </div>
              )}
              {isLoginLoading ? (
                <span className={styles.spinner}>
                  <Loader type="Oval" color="#64b5f6" height="40" width="40" />
                </span>
              ) : isAuthenticated ? (
                <button
                  className={styles.submitButton}
                  onClick={() => {
                    toggleModal();
                    this.clearModalInput();
                  }}
                  type="button"
                >
                  Close
                </button>
              ) : (
                <button
                  className={styles.submitButton}
                  disabled={!loginIdentifier || !loginPass}
                  type="submit"
                >
                  Login
                </button>
              )}
            </form>
          ) : (
            <form
              onSubmit={this.handleRegister}
              className={styles.contentContainer}
            >
              <span className={styles.loginHeader}>{registerMessage}</span>
              {!successfulRegister && (
                <div>
                  <span className={styles.loginHeader}>
                    Register an Account
                  </span>

                  <Input
                    onChange={this.handleChange}
                    label="Username"
                    name="signupUsername"
                    value={this.state.signupUsername}
                    currentVal={this.state.signupUsername}
                  />
                  <Input
                    onChange={this.handleChange}
                    label="Email"
                    name="signupEmail"
                    value={this.state.signupEmail}
                    currentVal={this.state.signupEmail}
                  />
                  <Input
                    onChange={this.handleChange}
                    label="Password"
                    name="signupPass"
                    value={this.state.signupPass}
                    currentVal={this.state.signupPass}
                  />
                  <Input
                    onChange={this.handleChange}
                    label="Confirm Password"
                    name="confirmPass"
                    value={this.state.confirmPass}
                    currentVal={this.state.confirmPass}
                  />
                </div>
              )}
              <div className={styles.registerButtons}>
                {isRegisterLoading ? (
                  <span className={styles.spinner}>
                    <Loader
                      type="Oval"
                      color="#64b5f6"
                      height="40"
                      width="40"
                    />
                  </span>
                ) : (
                  !successfulRegister && (
                    <button
                      className={styles.submitButton}
                      disabled={
                        !signupEmail ||
                        !signupUsername ||
                        !signupPass ||
                        !confirmPass
                      }
                    >
                      Register
                    </button>
                  )
                )}
                <button
                  onClick={() => {
                    this.setState({
                      login: true
                    });
                    this.clearModalInput();
                    registerSuccess({});
                  }}
                  className={styles.submitButton}
                >
                  Go Back
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.interfaceState.showModal,
    portfolio: state.tradeState.portfolio,
    registerStatus: state.authState.registerStatus,
    loginStatus: state.authState.loginStatus,
    isLoginLoading: state.authState.isLoginLoading,
    isRegisterLoading: state.authState.isRegisterLoading,
    isAuthenticated: state.authState.isAuthenticated,
    successfulRegister: sucessfulRegisterSelector(state)
  };
};

export default connect(
  mapStateToProps,
  { toggleModal, registerUser, loginUser, registerSuccess }
)(LoginModal);
