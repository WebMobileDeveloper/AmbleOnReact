import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const calRatio = (16 * (width / height));

export const screenWidth = width;
export const screenHeight = height;
export const ratio = (calRatio < 9 ? width / 9 : height / 18) / (360 / 9);

export const colors = {
  background: 'rgb(65, 77, 107)',
  dodgerBlue: 'rgb(58,139,255)',
  dusk: 'rgb(65,77,107)',
  blueyGray: 'rgb(134,154,183)',
  cloudyBlue: 'rgb(175,194,219)',
};
export const titleString = {
  TITLE: 'Audio Recorder Player',
  PLAY: 'Play',
  PAUSE: 'Pause',
  STOP: 'Stop',
  RECORD: 'Record',
  UPLOAD: 'Upload',
  CANCEL: 'Back'
};
export const recordState = {
  ready: 'ready',
  recording: 'recording',
  paused: 'paused',
  stopped: 'stopped',
  playing: 'playing',
  play_paused: 'play_paused',
}
export const getButTxt = (state) => {
  switch (state) {
    case recordState.ready:
      return { record: 'Record', play: 'Play' };
    case recordState.recording:
      return { record: 'Pause', play: 'Play' };
    case recordState.paused:
      return { record: 'Resume', play: 'Play' };
    case recordState.playing:
      return { record: 'Record', play: 'Pause' };
    case recordState.play_paused:
      return { record: 'Record', play: 'Resume' };

  }
}