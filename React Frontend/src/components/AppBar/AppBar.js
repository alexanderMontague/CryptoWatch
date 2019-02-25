import React from 'react';
import { connect } from 'react-redux';
import css from './AppBar.scss';

import cryptowatchLogo from '../../assets/cryptowatchLogo.png';
import hamburgerIcon from '../../assets/burgerIcon.png';

const AppBar = props => {
  const { isAuthenticated, user } = props;

  return (
    <div className={css.appBarWrapper}>
      <div className={css.appBarContent}>
        <div
          className={[css.hamburgerButton, css.menuItem, css.first].join(' ')}
          onClick={props.toggleMenu}
        >
          <img className={css.menuIcon} src={hamburgerIcon} />
        </div>
        <div className={[css.title, css.menuItem].join(' ')}>
          <img
            className={css.logo}
            src={cryptowatchLogo}
            alt="Cryptowatch Logo"
          />
          Cryptowatch
        </div>
        {isAuthenticated ? (
          <div className={[css.menuItem, css.last].join(' ')}>{`Welcome, ${
            user.username
          }!`}</div>
        ) : (
          <div
            className={[css.menuItem, css.last].join(' ')}
            style={{ width: '100px' }}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});

export default connect(mapStateToProps)(AppBar);
