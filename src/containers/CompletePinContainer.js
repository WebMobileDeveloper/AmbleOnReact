import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';

import CompletePinScreen from '../screens/CompletePinScreen';

export default class CompletePinContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <CompletePinScreen navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
