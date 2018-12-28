import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styles from './styles.scss';

import { toggleModal } from '../../actions/interfaceActions';
import { registerUser, loginUser } from '../../actions/authActions';

import { encodeBase64 } from '../../helpers';

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

const Input = props => (
  <label className={styles.inputContainer}>
    <input
      onChange={props.onChange}
      type={
        props.label.toLowerCase().includes('password') ? 'password' : 'text'
      }
      placeholder={props.label}
      name={props.name}
    />
  </label>
);

class LoginModal extends Component {
  componentDidMount() {
    Modal.setAppElement('body');
  }

  state = {
    login: true,
    loginIdentifier: '',
    loginPass: '',
    signupEmail: '',
    signupUsername: '',
    signupPass: '',
    confirmPass: ''
  };

  handleLogin = event => {
    event.preventDefault();

    const { loginIdentifier, loginPass } = this.state;
    const { loginUser } = this.props;

    const loginObject = encodeBase64({
      identifier: loginIdentifier,
      password: loginPass
    });

    loginUser(loginObject);

    //use this.props.toggleModal()
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

    //use this.props.toggleModal()
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    const { registerStatus } = this.props;

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

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.modalContainer}>
          {this.state.login ? (
            <form
              onSubmit={this.handleLogin}
              className={styles.contentContainer}
            >
              <div>
                <span className={styles.loginHeader}>Log In</span>
                <Input
                  onChange={this.handleChange}
                  label="Username or Email"
                  name="loginIdentifier"
                />
                <Input
                  onChange={this.handleChange}
                  label="Password"
                  name="loginPass"
                />
                <div className={styles.lilSpacing}>
                  <span className={styles.signupSpan}>
                    Don't have an account?{' '}
                  </span>
                  <span
                    className={styles.signupLink}
                    onClick={() => {
                      this.setState({ login: false });
                    }}
                  >
                    Register
                  </span>
                </div>
              </div>
              <button className={styles.submitButton}>Login</button>
            </form>
          ) : (
            <form
              onSubmit={this.handleRegister}
              className={styles.contentContainer}
            >
              <div>
                <span className={styles.loginHeader}>Register an Account</span>

                {registerMessage}

                <Input
                  onChange={this.handleChange}
                  label="Username"
                  name="signupUsername"
                />
                <Input
                  onChange={this.handleChange}
                  label="Email"
                  name="signupEmail"
                />
                <Input
                  onChange={this.handleChange}
                  label="Password"
                  name="signupPass"
                />
                <Input
                  onChange={this.handleChange}
                  label="Confirm Password"
                  name="confirmPass"
                />
              </div>
              <button className={styles.submitButton}>Register</button>
              <button
                onClick={() => {
                  this.setState({ login: true });
                }}
                className={styles.submitButton}
              >
                Go Back
              </button>
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
    registerStatus: state.authState.registerStatus
  };
};

export default connect(
  mapStateToProps,
  { toggleModal, registerUser, loginUser }
)(LoginModal);
