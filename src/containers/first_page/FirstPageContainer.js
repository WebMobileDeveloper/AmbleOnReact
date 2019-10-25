import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class LoginContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FistPageContainer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
