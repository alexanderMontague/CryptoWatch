import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { toggleModal } from '../../actions/interfaceActions';

class modalToggle extends Component {
  render() {
    return (
      <button onClick={this.props.toggleModal} className={styles.loginButton}>
        {this.props.children}
      </button>
    );
  }
}

export default connect(
  null,
  { toggleModal }
)(modalToggle);
