import React, { Component, Fragment } from 'react'
import css from './Details.scss'; 
import axios from 'axios';

import Header from '../../components/SectionHeader/Header';
import ToggleButton from 'react-toggle-button';

class Details extends Component {

  state = {
    selectedCoin: this.props.selectedCoin,
    coinFullName: '',
    coinPrice: '',
    coinMarket: '',
    coin24hr: '',
    coinVolume: '',
    coinRanking: '',
    coinImageURL: '',
    baseCurrency: '$CAD',
    showGraph: false
  }

  // If the user selects a new coin
  componentDidUpdate(prevProps) {
    const { coinObject, selectedCoin } = this.props;
    if(selectedCoin && (selectedCoin !== prevProps.selectedCoin)) {
      // Get coin FullName and Coin Image URL
      this.setState({ 
        coinFullName: coinObject[selectedCoin].FullName,
        coinImageURL: 'https://www.cryptocompare.com' + coinObject[selectedCoin].ImageUrl,
      });      
      // Get coin Price      
      axios.get('https://min-api.cryptocompare.com/data/price?fsym=' + selectedCoin + '&tsyms=CAD')
        .then(response => {
          this.setState({ coinPrice: '$' + response.data.CAD });
        })
        .catch(error => {
          console.log('Get Price Error', error)
        });

      // Get other coin information
      // axios.get('')
    }
  }

  render() {
    const { showDetails } = this.props;

    const thumbStyle = { 
      borderRadius: 5,
      border: '1px solid #616161',
      left: '5px'
    };
    const buttonStyle = { borderRadius: 5,
      border: '2px solid #616161'
    };
    const toggleColors = {
      active: {
        base: '#64B5F6',
        hover: '#2196F3'
      },
    }
    return (
      <Fragment>
        <Header title='Details' />
        { showDetails ?
        <div className={css.detailsContentContainer}>
          <div className={css.detailHeaderRow}>
            <div className={css.selectedCurrency}>
              Base:  
              {<br />}
              {this.state.baseCurrency}
            </div>
            <div className={css.coinNameContainer}>
              <div className={css.imageContainer}>
                <img className={css.coinIcon} src={this.state.coinImageURL} alt='Coin Icon' />
              </div>
              <div>
                {this.state.coinFullName}
              </div>
            </div>
            <div className={css.addToggleCoinContainer}>
              <div className={css.buttonContainers}>
                <h6>Toggle Graph: </h6>
                <ToggleButton
                  value={ this.state.showGraph }
                  colors={toggleColors}
                  thumbStyle={thumbStyle}
                  trackStyle={buttonStyle}
                  onToggle={(showGraph) => {
                    this.setState({
                      showGraph: !showGraph,
                    })
                  }}
                />
              </div>
              <div className={css.buttonContainers}>
                <h6>Add to Portfolio: </h6>
                <button className={css.addButton}>ADD</button>
              </div>
            </div>
          </div>
          <div className={css.detailInfoRow}>
            <div className={css.coinInfoRow}>
              <span>Price: {this.state.coinPrice}</span>
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
        </div> :
        <p className={css.selectCoinMessage}>Select a Coin!</p> }
      </Fragment>
    );
  }
}

export default Details;
