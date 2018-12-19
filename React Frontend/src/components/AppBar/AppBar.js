import React from 'react';
import css from './AppBar.scss';
import ModalButton from '../ModalButton';

import hamburgerIcon from '../../assets/burgerIcon.png';

const AppBar = props => {
  return (
    <div className={css.appBarWrapper}>
      <span className={css.appBarContent}>
        <span className={css.hamburgerButton} onClick={props.toggleMenu}>
          <img className={css.menuIcon} src={hamburgerIcon} />
        </span>
        <span className={css.title}>CryptoWatch</span>
        <ModalButton open>
          <span className={css.loginButton}>Login</span>
        </ModalButton>
        <span className={css.loginButton} onClick={props.logoutUser}>
          Logout
        </span>
      </span>
    </div>
  );
};

export default AppBar;
