import React, { Component } from 'react';
import { Keyboard } from 'react-native';

const withKeyboardDismiss = WrappedComponent =>
  class extends Component {
    componentDidMount() {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
      this.keyboardDidHideListener.remove();
    }

    keyboardDidHide = () => {
      Keyboard.dismiss();
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withKeyboardDismiss;
