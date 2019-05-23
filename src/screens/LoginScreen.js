import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import SocialBtn from '../components/SocialBtn';

import { scale } from '../utils/dimensions';

import colors from '../constants/colors';
import images from '../constants/images';

const LoginScreen = ({
  isGoogleSignInLoading,
  isFacebookLoginLoading,
  onFacebookLoginPress,
  onGoogleSignInPress,
}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>AmbleOn</Text>
    </View>
    <Text style={styles.title}>Welcome</Text>
    <View style={styles.socialButtonsContainer}>
      <Text style={styles.socialsTitle}>Login with</Text>
      <SocialBtn
        title="Facebook"
        containerStyle={styles.facebookImage}
        image={images.facebook_icon}
        disabled={isFacebookLoginLoading}
        onPress={onFacebookLoginPress}
      />
      <SocialBtn
        title="Google"
        image={images.google_icon}
        imageStyle={styles.googleImage}
        disabled={isGoogleSignInLoading}
        onPress={onGoogleSignInPress}
      />
    </View>
  </View>
);

LoginScreen.propTypes = {
  isFacebookLoginLoading: PropTypes.bool.isRequired,
  isGoogleSignInLoading: PropTypes.bool.isRequired,
  onFacebookLoginPress: PropTypes.func.isRequired,
  onGoogleSignInPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingTop: scale(80),
    paddingBottom: scale(130),
  },
  logoContainer: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteOpacity,
  },
  logoText: {
    fontSize: scale(30),
    color: colors.white,
    textAlign: 'center',
  },
  socialsTitle: {
    fontSize: scale(20),
    marginBottom: scale(10),
    color: colors.white,
  },
  socialButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: scale(50),
    color: colors.white,
  },
  facebookImage: {
    marginBottom: scale(20),
  },
  googleImage: {
    width: scale(35),
    height: scale(35),
    marginHorizontal: scale(13),
  },
});

export default LoginScreen;
