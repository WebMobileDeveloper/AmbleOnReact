import React, { Component } from 'react';
import { Platform, InteractionManager } from 'react-native';
import PropTypes from 'prop-types';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';

import { getPinsForTour } from '../../actions/toursActions';
import { navigationPropTypes, navigationDefaultProps } from '../../constants/propTypes';
import requestPermissionsServiceAndroid from '../../services/requestPermissionsService.android';
import AddPinsScreen from './AddPinsScreen';
import { DEV_ENV, DEV_DEVICE, DEV_LAT, DEV_LONG } from '../../Const';

class AddPinsContainer extends Component {
  state = {
    region: {
      latitude: DEV_DEVICE ? DEV_LAT : undefined,
      longitude: DEV_DEVICE ? DEV_LONG : undefined,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
    pins: [],
    GPSError: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.didBlurSubscription = navigation.addListener('didBlur', () => {
    });
    InteractionManager.runAfterInteractions(() => {
      if (Platform.OS === 'android') {
        if (!DEV_DEVICE) {
          requestPermissionsServiceAndroid.location(this.getLocation);
        }
      } else {
        this.getLocation();
      }
    });
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          region: {
            ...this.state.region,
            latitude,
            longitude,
          },
        });
      },
      error => {
        this.setState({ GPSError: error.code });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  onGoToCreatePin = (coordinate) => {
    const { navigation, currentTour: { id: tourId }, } = this.props;
    navigation.navigate('CreatePin', { tourId, coordinate });
  };

  onRegionChangeComplete = region => this.setState({ region });

  onSaveTourPress = () => {
    const { navigation, currentTour, getPinsForTour } = this.props;
    getPinsForTour(currentTour.id);
    navigation.navigate('ToursList');
  };

  render() {
    const { region, GPSError } = this.state;
    const { navigation, currentTour: { pins }, } = this.props;
    return (
      <AddPinsScreen
        region={region}
        markers={pins}
        GPSError={GPSError}
        onGoBackPress={() => navigation.goBack()}
        onGoToCreatePin={this.onGoToCreatePin}
        onSaveTourPress={this.onSaveTourPress}
        onRegionChangeComplete={this.onRegionChangeComplete}
      />
    );
  }
}

AddPinsContainer.propTypes = {
  navigation: navigationPropTypes,
  currentTour: PropTypes.shape({
    pins: PropTypes.array,
  }),
  getPinsForTour: PropTypes.func,
};
AddPinsContainer.defaultProps = {
  navigation: navigationDefaultProps,
  currentTour: {
    pins: [],
  },
};

const mapStateToProps = ({ tours: { toursList } }, { navigation }) => {
  const tourId = navigation.getParam('tourId');

  return {
    currentTour: toursList.filter(({ id }) => id === tourId)[0],
  };
};

export default connect(
  mapStateToProps,
  { getPinsForTour }
)(AddPinsContainer);
