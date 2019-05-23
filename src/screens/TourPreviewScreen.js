import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';

import PropTypes from 'prop-types';
import { width } from 'react-native-dimension';

import colors from '../constants/colors';
import img from '../constants/images';

const imgPath = require('../assets/images/closeButton.png');

export default class TourPreviewScreen extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func,
    tourData: PropTypes.object,
    attachment: PropTypes.object,
    pinsLength: PropTypes.number,
    navigateStartTour: PropTypes.func,
  };

  render() {
    const { goBack, tourData, navigateStartTour, pinsLength, attachment } = this.props;
    if (attachment && attachment.media_type) {
      console.log(img.imageServiceUrl, attachment.uri);
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={imgPath} style={styles.img} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.titleHeaderText}>Lets start</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.tourTitle}>{tourData.item.title}</Text>
            {attachment && attachment.media_type == 1 ? (
              <Image
                resizeMode="contain"
                style={styles.tourImg}
                source={{ uri: `${img.imageServiceUrl}${attachment.uri}` }}
              />
            ) : null}
            {attachment && attachment.media_type == 2 ? (
              <View style={styles.videoContainer}>
                <Video
                  source={{ uri: `${img.imageServiceUrl}${attachment.uri}` }}
                  controls={true}
                  repeat={true}
                  resizeMode={"cover"}
                  volume={1.0}
                  rate={1.0}
                  // ignoreSilentSwitch={"inherit"}
                  style={styles.backgroundVideo}
                />
              </View>

            ) : null}
            {attachment && attachment.media_type == 3 ? (
              // <VideoPlayer
              //   endWithThumbnail
              //   thumbnail={{ uri: this.state.thumbnailUrl }}
              //   video={{ uri: this.state.videoUrl }}
              //   videoWidth={this.state.video.width}
              //   videoHeight={this.state.video.height}
              //   duration={this.state.video.duration  /* I'm using a hls stream here, react-native-video can't figure out the length, so I pass it here from the vimeo config */}
              //   ref={r => this.player = r}
              // />
              null
            ) : null}
            <Text style={styles.tourDescription}>{tourData.item.description}</Text>
            <Text style={styles.tourTextPins}>{`Pins: ${pinsLength}`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigateStartTour()}>
              <Text style={styles.buttonText}>Start tour</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#000485'
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
    borderBottomWidth: 1,
    borderColor: colors.black,
  },
  headerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.white,
  },
  img: {
    height: 30,
    width: 30,
  },
  titleHeaderText: {
    fontSize: 18,
    color: colors.white,
  },
  contentContainer: {
    backgroundColor: '#5B5CFF',
    paddingHorizontal: width(8),
    flex: 9,
  },
  tourImg: {
    width: width(84),
    height: width(50),
  },
  tourTitle: {
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.white,
  },
  tourDescription: {
    color: colors.white,
    fontSize: 14,
    fontStyle: 'italic',
  },
  tourTextPins: {
    fontSize: 28,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.green,
    alignItems: 'center',
    bottom: 0,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    paddingVertical: 5,
  },
  infoContainer: {
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  videoContainer: { flex: 1, justifyContent: "center" },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});