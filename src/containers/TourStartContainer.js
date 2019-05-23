import React, { Component } from 'react';
import { View, StyleSheet, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import mapConsts from '../constants/mapConstants';
import { deletePin } from '../actions/toursActions';
import TourStartScreen from '../screens/TourStartScreen';
import { getRoutArray } from '../services/polylineService';

class TourStartContainer extends Component {
  static propTypes = {
    toursList: PropTypes.array,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      pinsArray: [],
      routArray: [],
      currentPin: {},
      dataReady: false,
      modalVisible: false,
      modalTitle: 'Pin Title',
      tourTitle: '',
      region: {
        latitudeDelta: mapConsts.LAT_DELTA,
        longitudeDelta: mapConsts.LON_DELTA,
        latitude: Number.parseFloat(props.navigation.state.params.pins[0].coordinate.latitude),
        longitude: Number.parseFloat(props.navigation.state.params.pins[0].coordinate.longitude),
      },
    };
  }

  async componentDidMount() {
    const pinsArray = await this.getPinsFromStore();
    getRoutArray(pinsArray).then(routArray => {
      InteractionManager.runAfterInteractions(() => {
        this.setState({ routArray, dataReady: true });
      });
    });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onRegionChange = region => {
    this.setState({
      region,
    });
  };

  changeModalVisible = (modalVisible, modalTitle, currentPin) => {
    this.setState({
      modalTitle,
      modalVisible,
      currentPin,
    });
  };

  navigateToComplitePin = currentPin => {
    const { navigation } = this.props;
    navigation.navigate('CompletePin', { performPin: this.performPin, currentPin });
  };

  getPinsFromStore = () => {
    const { toursList, navigation } = this.props;
    const pinsWithStatus = [];
    toursList.forEach(item => {
      if (item.id === navigation.state.params.id) {
        item.pins.forEach(pin => {
          pinsWithStatus.push({ ...pin, complete: false });
        });
      }
    });
    this.setState({
      pinsArray: pinsWithStatus,
      tourTitle: navigation.state.params.title,
    });
    return pinsWithStatus;
  };

  performPin = currentPin => {
    const { pinsArray } = this.state;
    const newPinArray = [];
    pinsArray.forEach(item => {
      newPinArray.push(item.id === currentPin.id ? { ...item, complete: true } : item);
    });
    this.setState({
      modalVisible: false,
      pinsArray: newPinArray,
    });
  };

  render() {
    const {
      region,
      pinsArray,
      routArray,
      tourTitle,
      dataReady,
      modalTitle,
      currentPin,
      modalVisible,
    } = this.state;
    return (
      <View style={styles.container}>
        <TourStartScreen
          // data
          region={region}
          pins={pinsArray}
          tourTitle={tourTitle}
          routArray={routArray}
          dataReady={dataReady}
          modalTitle={modalTitle}
          currentPin={currentPin}
          modalVisible={modalVisible}
          // func
          goBack={this.goBack}
          performPin={this.performPin}
          onRegionChange={this.onRegionChange}
          changePinsAlert={this.changePinsAlert}
          deletePinRequest={this.deletePinRequest}
          changeModalVisible={this.changeModalVisible}
          navigateToComplitePin={this.navigateToComplitePin}
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
  { deletePin }
)(TourStartContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// send delete requst for pin =>

// deletePinRequest = async () => {
//   const { pinsArray, currentPin } = this.state;
//   const newPinsArray = [];
//   await this.setState({
//     modalVisible: false,
//   });
//   pinsArray.forEach(item => {
//     if (currentPin.id !== item.id) newPinsArray.push(item);
//   });
//   const res = await this.props.deletePin(currentPin.tourId, currentPin.id, {
//     array: newPinsArray,
//     tourId: currentPin.tourId,
//   });
//   if (res) {
//     this.setState({
//       pinsArray: newPinsArray,
//     });
//   }
// };
