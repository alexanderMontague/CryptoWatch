import React from 'react';
import css from './Header.scss';

const Header = props => {
  return (
    <div className={css.headerBar}>
      <span className={css.headerTitle}>{props.title}</span>
    </div>
  );
};

export default Header;
