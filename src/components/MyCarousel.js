import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import images from '../constants/images';
import Player from './recorder/Player';
import { width, height } from 'react-native-dimension';
export default class MyCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            activeSlide: 0
        }
        this._renderItem = this._renderItem.bind(this);
        this.pagination = this.pagination.bind(this);
    }
    componentDidMount() {
        this.setState({ entries: this.props.data });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            //Perform some operation
            this.setState({ entries: nextProps.data });
        }
    }
    _renderItem({ item, index }) {
        switch (item.media_type) {
            case 1:
                return <View style={styles.swiperChild} key={index} >
                    <Image source={{ uri: `${images.imageServiceUrl}${item.uri}` }}
                        style={styles.pinImg} />
                </View>
            case 2:
                return <View style={styles.swiperChild} key={index} >
                    <VideoPlayer
                        source={{ uri: `${images.imageServiceUrl}${item.uri}` }} style={styles.backgroundVideo}
                        paused={true}
                    />
                </View>
            case 3:
                return <View style={styles.swiperChild} key={index}><Player path={`${images.imageServiceUrl}${item.uri}`} /></View>
        }
    }

    pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length > 3 ? 3 : entries.length}
                activeDotIndex={activeSlide}
                // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    layout={'stack'}
                    layoutCardOffset={8}
                    sliderWidth={width(80)}
                    sliderHeight={height(40)}
                    itemWidth={width(70)}
                    itemHeight={height(40)}
                // sliderWidth={300}
                // sliderHeight={50}
                // itemWidth={200}
                // itemHeight={50}
                />
                {this.pagination()}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    // container: {
    //     backgroundColor: '#000000',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    pinImg: {
        width: width(80),
        height: width(60),
    },
    videoContainer: { flex: 1, justifyContent: "center" },
    backgroundVideo: {
        width: width(80),
        height: width(60),
    },
    wrapper: {

    },
    swiperChild: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
