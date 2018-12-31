import React from 'react';
import { connect } from 'react-redux';
import css from './AppBar.scss';
import ModalButton from '../ModalButton';

import hamburgerIcon from '../../assets/burgerIcon.png';

const AppBar = props => {
  const { isAuthenticated, user } = props;

  return (
    <div className={css.appBarWrapper}>
      <span className={css.appBarContent}>
        <span className={css.hamburgerButton} onClick={props.toggleMenu}>
          <img className={css.menuIcon} src={hamburgerIcon} />
        </span>
        <span className={css.title}>CryptoWatch</span>
        {isAuthenticated ? (
          <span>{`Welcome, ${user.username}!`}</span>
        ) : (
          <ModalButton open>
            <span className={css.loginButton}>Login</span>
          </ModalButton>
        )}
      </span>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});

export default connect(mapStateToProps)(AppBar);
