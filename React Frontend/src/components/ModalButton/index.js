import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css'

class modalToggle extends Component {
  render() {
    return (
      <button
        onClick={this.props.open ? this.props.openModal : this.props.closeModal }
        className={styles.loginButton}
      >
        {this.props.children}
      </button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
    openModal: () => {dispatch({ type: "OPEN_LOGIN_MODAL" })},
    closeModal: () => {dispatch({ type: "CLOSE_LOGIN_MODAL" })}
  })
}

export default connect(null, mapDispatchToProps)(modalToggle);

