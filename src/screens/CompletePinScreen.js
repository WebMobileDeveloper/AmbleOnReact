import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import PropTypes from 'prop-types';

import { width } from 'react-native-dimension';
import colors from '../constants/colors';
import images from '../constants/images';
import Video from 'react-native-video';

const imgPath = require('../assets/images/closeButton.png');

export default class CompletePinScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={imgPath} style={styles.img} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.titleHeaderText}>{navigation.state.params.currentPin.title}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          {/* <Text>{images.imageServiceUrl}{navigation.state.params.currentPin.attachment.uri}</Text> */}
          {/* <Text>{JSON.stringify(navigation.state.params.currentPin.attachment)}</Text> */}
          {navigation.state.params.currentPin.attachment && navigation.state.params.currentPin.attachment.media_type == 1 ? (
            <Image
              source={{
                uri: `${images.imageServiceUrl}${
                  navigation.state.params.currentPin.attachment.uri
                  }`,
              }}
              style={styles.pinImg}
            />
          ) : null}
          {navigation.state.params.currentPin.attachment && navigation.state.params.currentPin.attachment.media_type == 2 ? (
            // <View style={styles.videoContainer}>
              <Video
                source={{ uri: `${images.imageServiceUrl}${navigation.state.params.currentPin.attachment.uri}` }}
                controls={true}
                repeat={true}
                resizeMode={"cover"}
                volume={1.0}
                rate={1.0}
                // ignoreSilentSwitch={"inherit"}
                style={styles.backgroundVideo}
              />
            // </View>

          ) : null}
          {navigation.state.params.currentPin.attachment && navigation.state.params.currentPin.attachment.media_type == 3 ? (
            <Text>Audio file</Text>
          ) : null}

          {!navigation.state.params.currentPin.attachment ? (
            <Text>Pin doesn’t have any images</Text>
          ) : null}
          <Text style={styles.description}>{navigation.state.params.currentPin.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.performPin(navigation.state.params.currentPin);
              navigation.goBack();
            }}
            style={styles.button}
          >
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
    marginTop: width(10),
    width: width(80),
    textAlign: 'center',
  },
  pinImg: {
    width: width(60),
    height: width(60),
  },
  videoContainer: { flex: 1, justifyContent: "center" },
  backgroundVideo: {
    width: width(80),
    height: width(60),
  },
});
