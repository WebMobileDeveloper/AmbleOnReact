import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Button } from 'native-base';

import CustomMapMarker from '../components/CustomMapMarker';
import Header from '../components/Header';

import colors from '../constants/colors';

import { scale, height, width } from '../utils/dimensions';

const renderGPSError = GPSError => {
  return GPSError === '5' ? (
    <Text>Enable GPS to can create pins</Text>
  ) : (
    <Text>GPS error code: {GPSError}</Text>
  );
};

const AddPinsScreen = ({
  region,
  markers,
  GPSError,
  onGoBackPress,
  onMapPress,
  onSaveTourPress,
  onRegionChangeComplete,
}) => (
  <View style={styles.container}>
    <Header
      containerStyle={styles.header}
      backgroundColor={colors.primaryOpacity()}
      title="Add pin"
      isNeedLeft
      onLeftPress={onGoBackPress}
    />
    <View style={styles.contentContainer}>
      {region.longitude && region.latitude && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          onPress={onMapPress}
        >
          {markers.map(({ coordinate: { latitude, longitude } }, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: +latitude,
                longitude: +longitude,
              }}
            >
              <CustomMapMarker order={i + 1} />
            </Marker>
          ))}
        </MapView>
      )}
      {GPSError && renderGPSError(GPSError)}
    </View>
    <View style={styles.tip}>
      <Text style={styles.tipText}>Tap to add more pins</Text>
    </View>
    <Button
      style={styles.saveTourBtn}
      block
      disabled={markers.length < 2}
      onPress={onSaveTourPress}
    >
      <Text style={styles.saveTourText}>Save tour</Text>
    </Button>
  </View>
);

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
  onGoBackPress: () => {},
};
export default AddPinsScreen;
