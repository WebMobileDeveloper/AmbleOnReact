import React, { Component } from 'react';
import { Platform, InteractionManager, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';

import { getPinsForTour } from '../actions/toursActions';
import AddPinsScreen from '../screens/AddPinsScreen';
import { navigationPropTypes, navigationDefaultProps } from '../constants/propTypes';
import requestPermissionsServiceAndroid from '../services/requestPermissionsService.android';

class AddPinsContainer extends Component {
  state = {
    region: {
      latitude: undefined,
      longitude: undefined,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    },
    temporaryMarker: [],
    GPSError: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.didBlurSubscription = navigation.addListener('didBlur', () => {
      this.setState({ temporaryMarker: [] });
    });
    InteractionManager.runAfterInteractions(() => {
      if (Platform.OS === 'android') {
        requestPermissionsServiceAndroid.location(this.getLocation);
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

  onMapPress = ({ nativeEvent: { coordinate } }) => {
    const {
      navigation,
      currentTour: { id: tourId },
    } = this.props;
    this.setState({ temporaryMarker: [{ coordinate }] });
    Alert.alert(
      '',
      'Would you like to add pin?',
      [
        { text: 'Yes', onPress: () => navigation.navigate('CreatePin', { tourId, coordinate }) },
        {
          text: 'No',
          onPress: () => this.setState({ temporaryMarker: [] }),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  onRegionChangeComplete = region => this.setState({ region });

  onSaveTourPress = () => {
    const { navigation, currentTour, getPinsForTour } = this.props;
    getPinsForTour(currentTour.id);
    navigation.navigate('ToursList');
  };

  render() {
    console.warn('AddPinsContainer props', this.props);
    const { region, GPSError, temporaryMarker } = this.state;
    const {
      navigation,
      currentTour: { pins },
    } = this.props;

    return (
      <AddPinsScreen
        region={region}
        markers={pins.concat(temporaryMarker)}
        GPSError={GPSError}
        onGoBackPress={() => navigation.goBack()}
        onMapPress={this.onMapPress}
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
