import React, { Component, Fragment } from 'react'
import css from './Details.scss'; 

import Header from '../../components/SectionHeader/Header';
class Details extends Component {

  render() {
    return (
      <Fragment>
        <Header title='Details' />
        <div className={css.detailsContentContainer}>

        </div>
      </Fragment>
    );
  }
}

export default Details;
