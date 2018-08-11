import React, { Component, Fragment } from 'react'
import css from './Details.scss'; 
import testPic from '../../../btg.png';

import Header from '../../components/SectionHeader/Header';
import ToggleButton from 'react-toggle-button';

class Details extends Component {

  state = {
    selectedCoin: 'Bitcoin (BTC)',
    baseCurrency: '$CAD',
    buttonType: 'Show Graph'
  }

  render() {
    const borderRadiusStyle = { borderRadius: 2 }
    return (
      <Fragment>
        <Header title='Details' />
        <div className={css.detailsContentContainer}>
          <div className={css.detailHeaderRow}>
            <div className={css.selectedCurrency}>
              Base:  
              {<br />}
              {this.state.baseCurrency}
            </div>
            <div className={css.coinNameContainer}>
              <div className={css.imageContainer}>
                <img className={css.coinIcon} src={testPic} alt='Coin Icon' />
              </div>
              <div>
                {this.state.selectedCoin}
              </div>
            </div>
            <div className={css.addToggleCoinContainer}>
              <button className={css.addButton}>ADD</button>

              <ToggleButton
                value={ this.state.value || false }
                thumbStyle={borderRadiusStyle}
                activeLabel='test'
                trackStyle={borderRadiusStyle}
                onToggle={(value) => {
                  this.setState({
                    value: !value,
                  })
                }}
              />


            </div>
          </div>
          <div className={css.detailInfoRow}>
            <div className={css.coinInfoRow}>
              <span>Price: ___</span>
              <span>Market Cap: ___</span>
            </div>
            <div className={css.coinInfoRow}>
              <span>24hr Change: ___</span>
              <span>Volume: ___</span>
            </div>
            <div className={css.coinInfoRow}>
              <span>Coin Ranking: ___</span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Details;
