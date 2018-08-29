import React from 'react';
import css from './HeaderItem.scss';

const HeaderItem = props => {
  const {itemTitle} = props;
  return (
    <div className={css.headerItemContainer}>
      {itemTitle}
    </div>
  )
}

export default HeaderItem;