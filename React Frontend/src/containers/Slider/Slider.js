import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import css from './Slider.scss';

import { toggleMenu } from '../../actions/interfaceActions';
import { logoutUser } from '../../actions/authActions';
import { deleteAllUsers } from '../../helpers/requests';

import { FaCog, FaSignOutAlt } from 'react-icons/fa';

class Slider extends Component {
  seeReq = () => {
    axios
      .get('http://localhost:3003/api/v1/public/seeReq', {
        withCredentials: true,
        credentials: 'include'
      })
      .then(res => {
        console.log('REQ: ', res.data);
      });
  };

  render() {
    const { showMenu, isAuthenticated, user, logoutUser } = this.props; // TODO auth in redux
    const menuSliderStyle = showMenu
      ? [css.menuSlider, css.Open]
      : [css.menuSlider, css.Close];

    return (
      <Fragment>
        <div
          onClick={this.props.toggleMenu}
          className={showMenu ? css.backgroundShadow : null}
        >
          <div
            onClick={this.props.toggleMenu}
            className={menuSliderStyle.join(' ')}
          >
            <div className={css.menuLayer}>
              {isAuthenticated ? (
                <Fragment>
                  <span className={css.titleText}>{`${
                    user.username
                  }'s Profile`}</span>

                  <span className={css.settingsButton}>
                    <FaCog />
                    Profile Settings
                  </span>
                  <span className={css.settingsButton} onClick={logoutUser}>
                    <FaSignOutAlt />
                    Logout
                  </span>
                </Fragment>
              ) : (
                <span className={css.titleText}>
                  Register / Log in to save your portfolio!
                </span>
              )}

              {/* TODO: Delete DEV stuff */}
              <div>
                <button
                  className={[css.reqButton, css.button].join(' ')}
                  onClick={() => {
                    this.seeReq();
                  }}
                >
                  See req object
                </button>

                <button
                  className={[css.delButton, css.button].join(' ')}
                  onClick={() => {
                    // DELETE ASAP. ONLY FOR DEV WORK
                    deleteAllUsers();
                  }}
                >
                  DELETE ALL USERS FROM DB. SERIOUSLY.
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMenu: state.interfaceState.showMenu,
    isAuthenticated: state.authState.isAuthenticated,
    user: state.authState.user
  };
};

export default connect(
  mapStateToProps,
  { toggleMenu, logoutUser }
)(Slider);
