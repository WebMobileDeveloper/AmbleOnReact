import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { initUser } from '../actions/initActions';

import { navigationPropTypes, navigationDefaultProps } from '../constants/propTypes';

class AuthLoading extends Component {
  async componentDidMount() {
    const { navigation } = this.props;
    await this.props.initUser(token => {
      const route = token ? 'AppStack' : 'AuthStack';
      navigation.navigate(route);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AuthLoading.propTypes = {
  navigation: navigationPropTypes,
  initUser: PropTypes.func.isRequired,
};

AuthLoading.defaultProps = {
  navigation: navigationDefaultProps,
};

export default connect(
  ({ auth: { token } }) => ({ token }),
  { initUser }
)(AuthLoading);
