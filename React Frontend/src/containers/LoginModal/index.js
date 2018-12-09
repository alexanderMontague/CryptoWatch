import React, { Component } from 'react';
import Modal from 'react-modal';
import styles from './styles.css';
import { connect } from 'react-redux';

import { toggleModal } from '../../actions/interfaceActions';
import { registerUser } from '../../actions/authActions';

import { encodeBase64 } from '../../helpers';
//import { registerUser } from '../../helpers/requests';

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
    email: '',
    pass: '',
    signupEmail: '',
    signupPass: '',
    confirmPass: ''
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.submit(this.state);
    //use this.props.toggleModal()
  };

  handleRegister = event => {
    event.preventDefault();

    this.props.registerUser('test payload');
    //this.props.registerUser(this.state);
    //use this.props.toggleModal()
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
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
                  label="Email"
                  name="email"
                />
                <Input
                  onChange={this.handleChange}
                  label="Password"
                  name="pass"
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

// const mapDispatchToProps = dispatch => {
//   return {
//     submit: info => {
//       dispatch({ type: 'LOGIN_SUCCESS', payload: info });
//     },
//     signup: info => {
//       dispatch({ type: 'SIGNUP_SUCCESS', payload: info });
//     },
//     toggleModal: () => {
//       dispatch(toggleModal);
//     }
//   };
// };

const mapStateToProps = state => {
  return {
    isOpen: state.interfaceState.showModal,
    portfolio: state.tradeState.portfolio
  };
};

export default connect(
  mapStateToProps,
  { toggleModal, registerUser }
)(LoginModal);
