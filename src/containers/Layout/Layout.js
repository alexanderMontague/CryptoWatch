import React, { Component, Fragment } from 'react';
import css from './Layout.scss';

import AppBar from '../../components/AppBar/AppBar';

class Layout extends Component {
  render() {
    return (
      <div className={css.appWrapper}>
        <AppBar />
        <div className={css.mainContainer}>
          <div>Portfolio Section</div>
          <div>
            <div>Search Section</div>
            <div>Details Section</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Layout;
