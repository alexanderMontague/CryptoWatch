import React from 'react';
import { connect } from 'react-redux';
import css from './AppBar.scss';

import cryptowatchLogo from '../../assets/cryptowatchLogo.png';
import hamburgerIcon from '../../assets/burgerIcon.png';

const AppBar = props => {
  const { isAuthenticated, user } = props;

  return (
    <div className={css.appBarWrapper}>
      <span className={css.appBarContent}>
        <span className={css.hamburgerButton} onClick={props.toggleMenu}>
          <img className={css.menuIcon} src={hamburgerIcon} />
        </span>
        <span className={css.title}>
          <img
            className={css.logo}
            src={cryptowatchLogo}
            alt="Cryptowatch Logo"
          />
          Cryptowatch
        </span>
        {isAuthenticated ? (
          <span>{`Welcome, ${user.username}!`}</span>
        ) : (
          <span />
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
