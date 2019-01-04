import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { toggleModal } from '../../actions/interfaceActions';

const modalToggle = props => {
  const toggleMenuAndModal = () => {
    props.toggleModal();
    props.toggleMenu ? props.toggleMenu() : null;
  };

  return (
    <button onClick={toggleMenuAndModal} className={styles.loginButton}>
      {props.children}
    </button>
  );
};

export default connect(
  null,
  { toggleModal }
)(modalToggle);
