import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import navigationService from './services/navigationService';

import { initUser } from './actions/initActions';

import colors from './constants/colors';

class Root extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        <AppNavigator
          ref={navigatorRef => {
            this.navigationRef = this.navigatorRef;
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default connect(
  null,
  { initUser }
)(Root);
