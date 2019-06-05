import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'native-base';

import CustomMapMarker from '../../components/CustomMapMarker';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import { scale, height, width } from '../../utils/dimensions';
import { DEV_ENV, DEV_DEVICE, DEV_LAT, DEV_LONG } from '../../Const';
const renderGPSError = GPSError => {
  return GPSError === '5' ? (
    <Text>Enable GPS to can create pins</Text>
  ) : (
      <Text>GPS error code: {GPSError}</Text>
    );
};


export default class AddPinsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temporaryMarker: [],
    }
  }
  onMapPress = ({ nativeEvent: { coordinate } }) => {
    this.setState({ temporaryMarker: [{ coordinate }] });
    Alert.alert(
      '',
      'Would you like to add pin?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.setState({ temporaryMarker: [] });
            this.props.onGoToCreatePin(coordinate);
          }
        },
        {
          text: 'No',
          onPress: () => {
            this.setState({ temporaryMarker: [] });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };
  renderMarkers = (markers) => {
    if (this.state.temporaryMarker.length > 0) markers = markers.concat(this.state.temporaryMarker)
    return markers.map((marker, i) => {
      if (!marker) return null;
      const { coordinate: { latitude, longitude } } = marker;
      return (
        <Marker key={i} coordinate={{ latitude: +latitude, longitude: +longitude, }}        >
          <CustomMapMarker order={i + 1} />
        </Marker>
      )
    })
  }
  render() {
    const { region, markers, GPSError, onGoBackPress, onSaveTourPress, onRegionChangeComplete, } = this.props;
    return (
      <View style={styles.container}>
        <Header containerStyle={styles.header} backgroundColor={colors.primaryOpacity()} title="Add pin" isNeedLeft onLeftPress={onGoBackPress} />
        <View style={styles.contentContainer}>
          {
            region.longitude && region.latitude &&
            (<MapView provider={PROVIDER_GOOGLE} style={styles.map} showsUserLocation={DEV_DEVICE ? false : true} region={region} 
              initialRegion={region} onRegionChangeComplete={onRegionChangeComplete} onPress={this.onMapPress}          >
              {this.renderMarkers(markers)}
            </MapView>)
          }
          {GPSError && renderGPSError(GPSError)}
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipText}>Tap to add more pins</Text>
        </View>
        <Button style={styles.saveTourBtn} block disabled={markers.length < 2} onPress={onSaveTourPress}>
          <Text style={styles.saveTourText}>Save tour</Text>
        </Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: scale(60),
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  saveTourBtn: {
    width: width / 3,
    height: scale(40),
    position: 'absolute',
    bottom: scale(70),
    left: width / 2 - width / 3 / 2,
  },
  saveTourText: {
    color: colors.white,
    fontSize: scale(20),
  },
  tip: {
    width: '100%',
    height: scale(60),
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryOpacity(0.6),
  },
  tipText: {
    fontSize: scale(28),
    color: colors.white,
  },
});

AddPinsScreen.propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }).isRequired,
  markers: PropTypes.array,
  onGoBackPress: PropTypes.func,
};
AddPinsScreen.defaultProps = {
  markers: [],
  onGoBackPress: () => { },
};
