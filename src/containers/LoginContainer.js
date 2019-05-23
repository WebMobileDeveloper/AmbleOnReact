import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import oauthService from '../services/oauthService';

import LoginScreen from '../screens/LoginScreen';

import {
  facebookSignIn as facebookSignInAction,
  googleSignIn as googleSignInAction,
} from '../actions/authActions';

import { navigationPropTypes } from '../constants/propTypes';

class LoginContainer extends PureComponent {
  onFacebookLogin = async () => {
    const { navigation, facebookSignIn } = this.props;

    await oauthService.facebook({
      success: (accessToken, userId) =>
        facebookSignIn({
          accessToken,
          userId,
          cb: () => navigation.navigate('AppStack'),
        }),
    });
  };

  onGoogleSignIn = async () => {
    const { navigation, googleSignIn } = this.props;

    await oauthService.google({
      success: (accessToken, userId) =>
        googleSignIn({ accessToken, userId, cb: () => navigation.navigate('AppStack') }),
    });
  };

  render() {
    const { isFacebookSignInLoading, isGoogleSignInLoading } = this.props;

    return (
      <LoginScreen
        isGoogleSignInLoading={isGoogleSignInLoading}
        isFacebookLoginLoading={isFacebookSignInLoading}
        onGoogleSignInPress={this.onGoogleSignIn}
        onFacebookLoginPress={this.onFacebookLogin}
      />
    );
  }
}

LoginContainer.propTypes = {
  navigation: navigationPropTypes.isRequired,
  isFacebookSignInLoading: PropTypes.bool.isRequired,
  isGoogleSignInLoading: PropTypes.bool.isRequired,
  facebookSignIn: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = ({ auth: { isFacebookSignInLoading, isGoogleSignInLoading } }) => ({
  isFacebookSignInLoading,
  isGoogleSignInLoading,
});

export default connect(
  mapDispatchToProps,
  { facebookSignIn: facebookSignInAction, googleSignIn: googleSignInAction }
)(LoginContainer);
