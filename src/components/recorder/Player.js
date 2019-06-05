import React, { Component, SyntheticEvent } from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    PermissionsAndroid,
    Button,
    Alert
} from 'react-native';

import { ratio, colors, screenWidth, titleString } from './Styles';
import RecorderButton from './RecorderButton';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            uri: null,
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
        // this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
        this.onStatusPress = this.onStatusPress.bind(this);
        this.onStartPlay = this.onStartPlay.bind(this);
        this.onPausePlay = this.onPausePlay.bind(this);
        this.onStopPlay = this.onStopPlay.bind(this);
    }
    onStatusPress = (e) => {
        const touchX = e.nativeEvent.locationX;
        const playWidth = (this.state.currentPositionSec / this.state.currentDurationSec) * (screenWidth - 56 * ratio);
        const currentPosition = Math.round(this.state.currentPositionSec);

        if (playWidth && playWidth < touchX) {
            const addSecs = Math.round((currentPosition + 3000));
            this.audioRecorderPlayer.seekToPlayer(addSecs);
        } else {
            const subSecs = Math.round((currentPosition - 3000));
            this.audioRecorderPlayer.seekToPlayer(subSecs);
        }
    }

    onStartPlay = async () => {
        const msg = await this.audioRecorderPlayer.startPlayer(this.props.path);
        this.audioRecorderPlayer.setVolume(1.0);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                this.audioRecorderPlayer.stopPlayer();
                this.audioRecorderPlayer.removePlayBackListener();
            }
            this.setState({
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    }

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
    }
    onStopPlay = async () => {
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
    }
    render() {
        const playWidth = this.state.currentDurationSec == 0 ? 0 : (this.state.currentPositionSec / this.state.currentDurationSec) * ((screenWidth * 0.8) * ratio);
        return (
            <View style={styles.container}>
                <Text style={styles.titleTxt}>{titleString.TITLE}</Text>
                <View style={styles.viewPlayer}>
                    <TouchableOpacity style={styles.viewBarWrapper} onPress={(e) => { this.onStatusPress(e) }}>
                        <View style={styles.viewBar}>
                            <View style={[styles.viewBarPlay, { width: playWidth },]} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.txtCounter}>{this.state.playTime} / {this.state.duration}</Text>
                    <View style={styles.playBtnWrapper}>
                        <RecorderButton style={styles.btn} onPress={this.onStartPlay} textStyle={styles.txt}>{titleString.PLAY}</RecorderButton>
                        <RecorderButton style={[styles.btn, { marginLeft: 50 * ratio, },]} onPress={this.onPausePlay} textStyle={styles.txt}>{titleString.PAUSE}</RecorderButton>
                        <RecorderButton style={[styles.btn, { marginLeft: 50 * ratio, },]} onPress={this.onStopPlay} textStyle={styles.txt}>{titleString.STOP}</RecorderButton>
                    </View>
                </View>
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgb(4, 19, 58)'
    },
    titleTxt: {
        marginTop: 30 * ratio,
        color: 'white',
        fontSize: 28 * ratio,
    },
    viewRecorder: {
        marginTop: 40 * ratio,
        width: '100%',
        alignItems: 'center',
    },
    recordBtnWrapper: {
        flexDirection: 'row',
    },
    viewPlayer: {
        marginTop: 30 * ratio,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    viewBarWrapper: {
        marginTop: 28 * ratio,
        marginHorizontal: 28 * ratio,
        alignSelf: 'stretch',
    },
    viewBar: {
        width: screenWidth * 0.8,
        backgroundColor: '#555',
        height: 4 * ratio,
        alignSelf: 'stretch',
    },
    viewBarPlay: {
        backgroundColor: 'white',
        height: 4 * ratio,
        width: 0,
    },
    playStatusTxt: {
        marginTop: 8 * ratio,
        color: '#ccc',
    },
    playBtnWrapper: {
        flexDirection: 'row',
        marginTop: 40 * ratio,
    },
    btn: {
        borderColor: 'white',
        borderWidth: 1 * ratio,
    },
    txt: {
        color: 'white',
        fontSize: 14 * ratio,
        marginHorizontal: 8 * ratio,
        marginVertical: 4 * ratio,
    },
    txtRecordCounter: {
        marginTop: 32 * ratio,
        color: 'white',
        fontSize: 20 * ratio,
        textAlignVertical: 'center',
        fontWeight: '200',
        fontFamily: 'Helvetica Neue',
        letterSpacing: 3,
    },
    txtCounter: {
        marginTop: 12 * ratio,
        color: 'white',
        fontSize: 20 * ratio,
        textAlignVertical: 'center',
        fontWeight: '200',
        fontFamily: 'Helvetica Neue',
        letterSpacing: 3,
    },
});
