import React, { Component, } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Slider } from 'react-native';
import { Button } from 'native-base';
import { ratio, titleString, recordState, getButTxt } from './Styles';
import RecorderButton from './RecorderButton';
import { mmss } from '../../Const';
import { scale } from '../../utils/dimensions';


import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';


export default class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordTime: 0,
            playTime: 0,
            duration: 0,
            recordTimeStr: '00:00',
            playTimeStr: '00:00',
            durationStr: '00:00',
            recordState: recordState.ready,
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
            hasPermission: undefined,
        };
        this._isMounted = false;
        this.Player = null;
        this.sliderEditing = false;


        this.prepareRecordingPath = this.prepareRecordingPath.bind(this);
        this.recordFunc = this.recordFunc.bind(this);
        this._record = this._record.bind(this);
        this._pause = this._pause.bind(this);
        this._resume = this._resume.bind(this);
        this._stop = this._stop.bind(this);
        this._finishRecording = this._finishRecording.bind(this);
        this.playFunc = this.playFunc.bind(this);
        this._play = this._play.bind(this);
        this.playComplete = this.playComplete.bind(this);
        this._playPause = this._playPause.bind(this);
        this._playStop = this._playStop.bind(this);
        this.onSliderEditStart = this.onSliderEditStart.bind(this);
        this.onSliderEditEnd = this.onSliderEditEnd.bind(this);
        this.onSliderEditing = this.onSliderEditing.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }
    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }
    componentDidMount() {
        this._isMounted = true;
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this._isMounted && this.setState({ hasPermission: isAuthorised });
            if (!isAuthorised) return;
            AudioRecorder.onProgress = (data) => {
                const currentTime = Math.floor(data.currentTime);
                this._isMounted && this.setState({
                    recordTime: currentTime,
                    recordTimeStr: mmss(currentTime),
                });
            };
            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._isMounted && this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
        this.timeout = setInterval(() => {
            if (this.Player && this.Player.isLoaded() && this.state.recordState == recordState.playing && !this.sliderEditing) {
                this.Player.getCurrentTime((seconds, isPlaying) => {
                    this._isMounted && this.setState({ playTime: seconds, playTimeStr: mmss(seconds) });
                })
            }
        }, 100);
    }
    componentWillUnmount() {
        let self = this;
        self._isMounted = false;
        if (self.timeout) {
            clearInterval(self.timeout);
        }
        self._playStop();
        self._stop();
    }
    // =============================================
    //              Record functions
    // =============================================
    recordFunc = (butText) => {
        switch (butText) {
            case 'Record':
                this._record();
                break;
            case 'Pause':
                this._pause();
                break;
            case 'Resume':
                this._resume();
                break;
        }
    }
    async _record() {
        if (!this.state.hasPermission) {
            Alert.alert('Can\'t record, no permission granted!');
            return;
        }
        if (this.state.recordState == recordState.playing || this.state.recordState == recordState.play_paused) {
            await this._playStop();
        }
        if (this.state.recordState == recordState.ready) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        try {
            await AudioRecorder.startRecording();
            this._isMounted && this.setState({ recordState: recordState.recording });
        } catch (error) {
            console.error(error);
        }
    }

    async _pause() {
        try {
            await AudioRecorder.pauseRecording();
            this._isMounted && this.setState({ recordState: recordState.paused });
        } catch (error) {
            console.error(error);
        }
    }

    async _resume() {
        try {
            await AudioRecorder.resumeRecording();
            this._isMounted && this.setState({ recordState: recordState.recording });
        } catch (error) {
            console.error(error);
        }
    }

    async _stop() {
        const self = this;

        if (self.state.recordState == recordState.recording || self.state.recordState == recordState.paused) {
            try {
                const filePath = await AudioRecorder.stopRecording();
                if (self._isMounted) {
                    self.setState({ recordState: recordState.ready });
                    if (Platform.OS === 'android') {
                        self._isMounted && self._finishRecording(true, filePath);
                    }
                }
                return filePath;
            } catch (error) {
                console.error(error);
            }
        }

    }
    _finishRecording(didSucceed, filePath, fileSize) {
        this._isMounted && this.setState({ finished: didSucceed });
    }

    // =============================================
    //              play functions
    // =============================================
    playFunc = (butText) => {
        switch (butText) {
            case 'Play':
                this._play();
                break;
            case 'Pause':
                this._playPause();
                break;
            case 'Resume':
                this._play();
                break;
        }
    }
    async _play() {
        if (!this.state.recordTime) {
            return
        };
        if (this.Player) {
            this.setState({ recordState: recordState.playing });
            this.Player.play(this.playComplete);
        } else {
            if (this.state.recordState == recordState.recording || this.state.recordState == recordState.paused) {
                await this._stop();
            }
            // setTimeout(() => {
            this.Player = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                } else {
                    if (this._isMounted) {
                        const duration = this.Player.getDuration();
                        this.setState({
                            recordState: recordState.playing,
                            duration: duration,
                            durationStr: mmss(duration)
                        });
                        this.Player.play(this.playComplete);
                    }

                }
            });
            // }, 100);
        }
    }
    async playComplete(success) {
        if (this.Player && this._isMounted) {
            if (!success) {
                Alert.alert('Notice', 'audio file error');
            }
            await this._playStop();
        }
    }
    _playPause() {
        this.Player.pause(() => {
            this._isMounted && this.setState({ recordState: recordState.play_paused })
        })
    }

    _playStop() {
        const self = this;
        return new Promise((resolve, reject) => {
            if (!self.Player) {
                resolve()
            }
            self.Player.stop(() => {
                self.Player.release();
                self.Player = null;
                if (self._isMounted) {
                    self.setState({
                        recordState: recordState.ready,
                        playTime: 0,
                        playTimeStr: mmss(0),
                    }, () => {
                        resolve()
                    });
                } else {
                    resolve()
                }
            })
        })

    }

    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if (this.Player) {
            this.Player.setCurrentTime(value);
            this.setState({ playTime: value, playTimeStr: mmss(value) });
        }
    }

    // =============================================
    //              general functions
    // =============================================

    onUpload(withUrl = true) {
        if (this.state.recordState == recordState.recording || this.state.recordState == recordState.paused) {
            Alert.alert("You are recording now. Please stop record and try again!");
            return;
        }
        if (withUrl) {
            if (this.state.recordTime) {
                this.props.onUpload("file://" + this.state.audioPath);
            } else {
                Alert.alert("There isn't any record data!");
                return;
            }
        } else {
            this.props.onUpload();
        }

    }
    render() {
        let butText = getButTxt(this.state.recordState);
        return (
            <View style={styles.container}>
                <Text style={styles.titleTxt}>{titleString.TITLE}</Text>
                <Text style={styles.txtRecordCounter}>{this.state.recordTimeStr}</Text>
                <View style={styles.viewRecorder}>
                    <View style={styles.recordBtnWrapper}>
                        <RecorderButton style={styles.btn} onPress={() => this.recordFunc(butText.record)} textStyle={styles.txt}>{butText.record}</RecorderButton>
                        <RecorderButton style={[styles.btn, { marginLeft: 100 * ratio, },]} onPress={() => this._stop()} textStyle={styles.txt}>{titleString.STOP}</RecorderButton>
                    </View>
                </View>
                <View style={styles.viewPlayer}>
                    <Slider
                        onTouchStart={() => this.onSliderEditStart()}
                        onTouchEnd={() => this.onSliderEditEnd()}
                        onValueChange={(value) => this.onSliderEditing(value)}
                        value={this.state.playTime} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white'
                        style={styles.slider} />
                    <Text style={styles.txtCounter}>{this.state.playTimeStr} / {this.state.durationStr}</Text>
                    <View style={styles.playBtnWrapper}>
                        <RecorderButton style={styles.btn} onPress={() => this.playFunc(butText.play)} textStyle={styles.txt}>{butText.play}</RecorderButton>
                        <RecorderButton style={[styles.btn, { marginLeft: 100 * ratio, },]} onPress={() => this._playStop()} textStyle={styles.txt}>{titleString.STOP}</RecorderButton>
                    </View>
                    <Button style={styles.actionBtn} block onPress={() => this.onUpload()} ><Text style={styles.buttonTitle}>{titleString.UPLOAD}</Text></Button>
                    <Button style={styles.actionBtn} block onPress={() => this.onUpload(false)} ><Text style={styles.buttonTitle}>{titleString.CANCEL}</Text></Button>
                    {/* <View style={styles.playBtnWrapper}>
                        <RecorderButton style={styles.btn} onPress={() => this.onUpload()} textStyle={styles.txt}>{titleString.UPLOAD}</RecorderButton>
                        <RecorderButton style={[styles.btn, { marginLeft: 100 * ratio, },]} onPress={() => this.onCancel()} textStyle={styles.txt}>{titleString.CANCEL}</RecorderButton>
                    </View> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'blue',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgb(4, 19, 58)'
    },
    titleTxt: {
        marginTop: 100 * ratio,
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
    slider: {
        marginTop: 20 * ratio,
        marginHorizontal: 28 * ratio,
        alignSelf: 'stretch',
        // marginHorizontal: Platform.select({ ios: 5 })
    },
    viewBar: {
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
        marginVertical: 40 * ratio,
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
    actionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20 * ratio,
        marginHorizontal: 50 * ratio,
    },
    buttonTitle: {
        color: 'white',
        fontSize: scale(20),
    },
});
