import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';
import { width } from 'react-native-dimension';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import colors from '../constants/colors';
import CustomMapMarker from '../components/CustomMapMarker';

const imgPath = require('../assets/images/back.png');
const completeMarkerPath = require('../assets/images/map_marker_complete.png');
const incompleteMarkerPath = require('../assets/images/map_marker.png');

export default class TourStartScreen extends PureComponent {
  static propTypes = {
    pins: PropTypes.array,
    goBack: PropTypes.func,
    region: PropTypes.object,
    dataReady: PropTypes.bool,
    performPin: PropTypes.func,
    routArray: PropTypes.array,
    tourTitle: PropTypes.string,
    modalTitle: PropTypes.string,
    modalVisible: PropTypes.bool,
    onRegionChange: PropTypes.func,
    changeModalVisible: PropTypes.func,
    navigateToComplitePin: PropTypes.func,
  };

  render() {
    const {
      pins,
      goBack,
      region,
      routArray,
      dataReady,
      tourTitle,
      performPin,
      modalTitle,
      modalVisible,
      onRegionChange,
      changeModalVisible,
      navigateToComplitePin,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={imgPath} style={styles.img} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headeTitleText}>{tourTitle}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.mapContainer}>
            {dataReady ? (
              <MapView
                region={region}
                style={styles.map}
                showsUserLocation
                initialRegion={region}
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={res => onRegionChange(res)}
              >
                <Polyline coordinates={routArray} strokeColor="red" strokeWidth={3} />
                {pins.map((item, index) => {
                  return (
                    <Marker
                      key={item.id}
                      identifier={item.id}
                      onPress={() => {
                        // changeModalVisible(true, item.title, item);
                        // here new logic of complite pin ===>
                        navigateToComplitePin(item);
                      }}
                      coordinate={{
                        latitude: Number.parseFloat(item.coordinate.latitude),
                        longitude: Number.parseFloat(item.coordinate.longitude),
                      }}
                    >
                      <CustomMapMarker
                        order={index + 1}
                        source={item.complete ? completeMarkerPath : incompleteMarkerPath}
                      />
                    </Marker>
                  );
                })}
              </MapView>
            ) : (
              <View style={styles.spinContainer}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
            <Modal visible={modalVisible} transparent animationType="none">
              <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                  <Text style={styles.modalTitleText}>{`Complete ${modalTitle} ?`}</Text>
                  <View style={styles.rowContainer}>
                    <TouchableOpacity
                      onPress={() => changeModalVisible(false, '')}
                      style={styles.modalButton}
                    >
                      <Text style={{}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => {
                        performPin();
                      }}
                    >
                      <Text>Ok</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => goBack()} style={styles.button}>
              <Text style={styles.buttonText}>Stop tour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#000485',
    borderColor: colors.blackOpacity,
  },
  headerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: colors.white,
  },
  headerTitleContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: '#5B5CFF',
    flex: 9,
    paddingHorizontal: width(5),
  },
  img: {
    width: width(10),
    height: width(10),
  },
  headeTitleText: {
    fontSize: 20,
    color: colors.white,
  },
  mapContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.orange,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.blackOpacity,
  },
  buttonText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.modalBackground,
  },
  modalContentContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 5,
    width: '80%',
  },
  modalButton: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.blackOpacity,
  },
  modalTitleText: { fontSize: 20, padding: 20 },
  rowContainer: { flexDirection: 'row' },
  spinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
