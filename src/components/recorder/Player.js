import React, { Component, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Slider
} from 'react-native';
import Sound from 'react-native-sound';

import { ratio, screenWidth, titleString, recordState, getButTxt } from './Styles';
import RecorderButton from './RecorderButton';
import { mmss, } from '../../Const';


Sound.setCategory('Playback');
export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            playTime: 0,
            duration: 0,
            playTimeStr: '00:00',
            durationStr: '00:00',
            recordState: recordState.ready,
        };
        this._isMounted = false;
        this.Player = null;
        this.sliderEditing = false;
    }
    componentDidMount() {
        this._isMounted = true;
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
        if (this.Player) {
            this.setState({ recordState: recordState.playing });
            this.Player.play(this.playComplete);
        } else {
            setTimeout(() => {
            this.Player = new Sound(this.props.path, '', (error) => {
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
            }, 100);
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


    render() {
        let butText = getButTxt(this.state.recordState);
        return (
            <View style={styles.container}>
                <Text style={styles.titleTxt}>Audio Player</Text>
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
                </View>
            </View>
        );
    }


}
const styles = StyleSheet.create({

    container: {
        // flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 20,
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
    slider: {
        marginTop: 20 * ratio,
        marginHorizontal: 5 * ratio,
        alignSelf: 'stretch',
        // marginHorizontal: Platform.select({ ios: 5 })
    },
});
