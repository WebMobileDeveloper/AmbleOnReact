import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Button } from 'native-base';
import Overlay from 'react-native-modal-overlay';

import Header from '../components/Header';
import { scale } from '../utils/dimensions';
import colors from '../constants/colors';
import NativeBaseFloatingInput from '../components/NativeBaseFloatingInput';

export default class CreatePinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, recoderVisible: false };
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ modalVisible: false });
  }
  choiceAcion(needCamera, media_type) {
    this.setState({ modalVisible: false });
    this.props.openPicker(needCamera, media_type);
  }


  render() {
    const { isCreatePinLoading, formValues, headerTitle, errors: { title, description },
      touched, dirty, isFormValid, handleChange, handleBlur, handleCreatePinSubmit, onLeftPress, recoderVisible } = this.props;
    return (
      <View style={styles.container}>
        <Header title="Create Pin" isNeedLeft onLeftPress={onLeftPress} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainer}>
          <Form>
            <NativeBaseFloatingInput value={formValues.title} placeholder="Title" errorMessage={title} isValid={touched.title && title}
              handleChange={handleChange('title')} handleBlur={handleBlur('title')} />
            <NativeBaseFloatingInput item={{ last: true }} placeholder="Description" value={formValues.description} errorMessage={description}
              isValid={touched.description && description} handleChange={handleChange('description')} handleBlur={handleBlur('description')} />
          </Form>
          <Button block disabled={!isFormValid} style={styles.submitBtn} onPress={() => this.setState({ modalVisible: true })} >
            {isCreatePinLoading ? (<ActivityIndicator large color={colors.primary} />) : (<Text style={styles.buttonTitle}>Create pin with Media</Text>)}
          </Button>
          {/* <Button block disabled={!isFormValid} style={styles.submitBtn} onPress={() => openPicker(true)} >
            {isCreatePinLoading ? (<ActivityIndicator large color={colors.primary} />) : (<Text style={styles.buttonTitle}>Choose photo and create pin</Text>)}
          </Button> */}
          {/* <Button block disabled={!isFormValid} style={styles.submitBtn} onPress={() => openPicker(false)}  >
            {isCreatePinLoading ? (<ActivityIndicator large color={colors.primary} />) : (<Text style={styles.buttonTitle}>Make photo and create pin</Text>)}
          </Button> */}
          <Button style={styles.submitBtn} block disabled={!isFormValid} onPress={() => handleCreatePinSubmit(null)} >
            {isCreatePinLoading ? (<ActivityIndicator large color={colors.primary} />) : (<Text style={styles.buttonTitle}>Add pin</Text>)}
          </Button>
        </ScrollView>
        <Overlay visible={this.state.modalVisible} onClose={this.onClose} animationType="zoomIn" containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          childrenWrapperStyle={{ backgroundColor: '#eee' }}
          animationDuration={500}>
          <Text style={styles.actionTitle}>Choice Action</Text>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(false, 1)} ><Text style={styles.buttonTitle}>Import Picture</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(true, 1)} ><Text style={styles.buttonTitle}>Take Photo</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(false, 2)} ><Text style={styles.buttonTitle}>Import Video</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(true, 2)} ><Text style={styles.buttonTitle}>Capture Video</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(false, 3)} ><Text style={styles.buttonTitle}>Import Audio</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(true, 3)} ><Text style={styles.buttonTitle}>Record Audio</Text></Button>
          <Button style={styles.actionBtn} block onPress={this.onClose} ><Text style={styles.buttonTitle}>Cancel</Text></Button>
        </Overlay>
        {/* <Overlay visible={this.state.recoderVisible} >
          <Recorder
            style={{ flex: 1 }} onComplete={this.recorderComplete} maxDurationMillis={150000} showDebug={true} showBackButton={true}
            audioMode={{
              allowsRecordingIOS: true,
              interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
              playsInSilentModeIOS: true,
              playsInSilentLockedModeIOS: true,
              shouldDuckAndroid: true,
              interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
              playThroughEarpieceAndroid: false
            }}
            resetButton={(renderProps) => {
              return (<Button onPress={renderProps.onPress} danger block style={{ marginVertical: 5 }} ><Text>Reset</Text></Button>);
            }}
            recordingCompleteButton={(renderProps) => {
              return (<Button onPress={renderProps.onPress} block success style={{ marginVertical: 5 }}><Text>Finish</Text></Button>);
            }}
            playbackSlider={(renderProps) => {
              console.log({ 'maximumValue: ': renderProps.maximumValue });
              return (<Slider minimimValue={0} maximumValue={renderProps.maximumValue} onValueChange={renderProps.onSliderValueChange}
                value={renderProps.value} style={{ width: '100%' }} />);
            }}
          />
        </Overlay> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingTop: scale(70),
    paddingBottom: scale(40),
    justifyContent: 'space-between',
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    marginBottom: scale(20)
  },
  buttonTitle: {
    color: colors.white,
    fontSize: scale(20),
  },
  actionTitle: {
    color: colors.primary,
    fontSize: scale(20),
  },
});

CreatePinScreen.propTypes = {
  onLeftPress: PropTypes.func,
};

CreatePinScreen.defaultProps = {
  onLeftPress: () => { },
};