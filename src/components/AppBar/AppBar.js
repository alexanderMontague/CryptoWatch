import React from 'react';
import PropTypes from 'prop-types';
import css from './AppBar.scss';

import hamburgerIcon from '../../assets/burgerIcon.png';

const AppBar = props => {
  return (
    <div className={css.appBarWrapper}>
      <span className={css.appBarContent}>
        <span className={css.hamburgerButton} onClick={props.toggleMenu}>
          <img className={css.menuIcon} src={hamburgerIcon} />
        </span>
        <span className={css.title}>CryptoWatch</span>
      </span>
    </div>
  );
};

export default AppBar;
