import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { width } from 'react-native-dimension';

import colors from '../../constants/colors';
import images from '../../constants/images';
import MyCarousel from '../../components/MyCarousel';

export default class CompletePinScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  completePin = () => {
    const { navigation } = this.props;
    const currentPin = navigation.state.params.currentPin;
    navigation.state.params.performPin(currentPin);
    navigation.goBack();
  }
  render() {
    const { navigation } = this.props;
    const currentPin = navigation.state.params.currentPin;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.closeButton} style={styles.img} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.titleHeaderText}>{currentPin.title}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ height: width(100) }}>
            <MyCarousel data={currentPin.attachments} />
          </View>
          <Text style={styles.description}>{currentPin.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.completePin} style={styles.button} >
            <Text style={styles.buttonText}>Complete pin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#000485',
  },
  headerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.white,
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
    borderBottomWidth: 1,
    borderColor: colors.black,
  },
  contentContainer: {
    backgroundColor: '#5B5CFF',
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 30,
    width: 30,
  },
  buttonContainer: {
    // flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.green,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: colors.blackOpacity,
  },
  buttonText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  titleHeaderText: {
    fontSize: 18,
    color: colors.white,
  },
  description: {
    marginTop: width(5),
    width: width(80),
    textAlign: 'center',
  },

});
