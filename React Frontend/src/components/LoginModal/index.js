import React, { Component } from 'react';
import Login from './Login';
import Register from  './Register';
import RegisterSuccess from './RegisterSuccess';

class ModalSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    }
  }
  render() {
    let content = <div />;
    switch (this.state.step) {
      case 1:
        content = Login;
      case 2:
        content = Register;
      case 3:
      default:
        content = RegisterSuccess;
    }

    return (
      <div>
        <div className="registerBackground" />
        <div className="registerContainer">
          <ModalSwitch />
        </div>
      </div>

    )
  }
}

export default ModalSwitch;