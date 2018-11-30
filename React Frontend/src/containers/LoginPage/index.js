import React, {Component} from 'react';
import styles from './styles.css';
import {connect} from 'react-redux'

const Input = props => (
  <label className={styles.inputContainer}>
    <input
      onChange={props.onChange}
      type={props.label==='Password' && 'password'}
      placeholder={props.label}
      name={props.name} />
  </label>
);

//Could be the worst code I've ever written, make sure names of input match names in state

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      pass: ""
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submit(this.state);
  };
  handleChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  };

  render() {
    return (
      <div className={styles.background}>
        <div className={styles.modalContainer}>
          <form
            onSubmit={this.handleSubmit}
            className={styles.contentContainer}>
            <div>
              <span className={styles.loginHeader}>Sign In</span>
              <Input onChange={this.handleChange} label="Email" name="email"/>
              <Input onChange={this.handleChange} label="Password" name="pass"/>
            </div>
            <button
              className={styles.submitButton}
            >Login</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
    submit: (info) => {dispatch({ type: "LOGIN_SUCCESS", payload: info })}
  })
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
