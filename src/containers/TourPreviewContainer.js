import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import networkErrorHandler from '../utils/networkErrorHandler';

import TourPreviewScreen from '../screens/TourPreviewScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class TourPreviewContainer extends Component {
  static propTypes = {
    toursList: PropTypes.array,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      attachment: null,
    };
  }

  componentDidMount() {
    this.getPinsFromStore();
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateStartTour = () => {
    const { navigation } = this.props;
    const { pins } = this.state;
    if (pins.length === 0) {
      networkErrorHandler('Tour finish');
    } else {
      navigation.navigate('TourStart', navigation.state.params.item);
    }
  };

  checkImageInPins = pins =>
    new Promise(resolve => {
      pins.forEach(pin => {
        if (pin.attachment) {
          resolve(pin.attachment);
        }
        resolve(null);
      });
    });

  getPinsFromStore = () => {
    const { toursList, navigation } = this.props;
    toursList.forEach(async item => {
      if (item.id === navigation.state.params.item.id) {
        const attachment = await this.checkImageInPins(item.pins);
        this.setState({
          pins: item.pins,
          attachment: attachment,
        });
      }
    });
  };

  render() {
    const { navigation } = this.props;
    const { pins, attachment } = this.state;
    return (
      <View style={styles.container}>
        <TourPreviewScreen
          // navigation
          goBack={this.goBack}
          navigateStartTour={this.navigateStartTour}
          // data
          attachment={attachment}
          pinsLength={pins.length}
          tourData={navigation.state.params}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    toursList: state.tours.toursList,
  };
};

export default connect(
  mapStateToProps,
  null
)(TourPreviewContainer);
