import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, StyleSheet, Platform, PermissionsAndroid, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Button } from 'native-base';
import Overlay from 'react-native-modal-overlay';

import Header from '../../components/Header';
import { scale } from '../../utils/dimensions';
import colors from '../../constants/colors';
import Recorder from '../../components/recorder/Recorder';
import NativeBaseFloatingInput from '../../components/NativeBaseFloatingInput';

export default class CreatePinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, recorderVisible: false };
    this.choiceAcion = this.choiceAcion.bind(this);
    this.showRecordModal = this.showRecordModal.bind(this);
    this.onSaveAudio = this.onSaveAudio.bind(this);
    this.onSavePin = this.onSavePin.bind(this);
  }
  choiceAcion(needCamera, media_type) {
    this.setState({ modalVisible: false }, () => {
      let self = this
      setTimeout(() => {
        self.props.openPicker(needCamera, media_type);
      }, 500)

    });
  }

  showRecordModal = () => {
    this.setState({ modalVisible: false, recorderVisible: true });
  }
  onSaveAudio = (uri) => {
    this.setState({ recorderVisible: false });
    if (uri) {
      this.props.saveRecordAudio(uri);
    }
  }
  onSavePin = () => {
    if (this.props.pinId) {
      this.props.onLeftPress();
    } else {
      this.props.handleCreatePinSubmit(null);
    }
  }


  render() {
    const { isCreatePinLoading, formValues, headerTitle, errors: { title, description },
      touched, dirty, isFormValid, handleChange, handleBlur, handleCreatePinSubmit, onLeftPress, openPicker, } = this.props;
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

          {/* <Button block disabled={!isFormValid} style={styles.submitBtn} onPress={() => this.setState({ modalVisible: true })} >
            {isCreatePinLoading ? <ActivityIndicator large color={colors.primary} /> : <Text style={styles.buttonTitle}>{this.props.pinId ? 'Add New Media' : 'Add Pin with Media'} </Text>}
          </Button> */}
          <Button block disabled={!isFormValid} style={styles.submitBtn} onPress={() => this.setState({ modalVisible: true })} >
            {isCreatePinLoading ? <ActivityIndicator large color={colors.primary} /> : <Text style={styles.buttonTitle}>{this.props.pinId ? 'Add New Media' : 'Add Pin with Media'} </Text>}
          </Button>
          <Button style={styles.submitBtn} block disabled={!isFormValid} onPress={() => this.onSavePin()} >
            {isCreatePinLoading ? <ActivityIndicator large color={colors.primary} /> : <Text style={styles.buttonTitle}>{this.props.pinId ? 'Add New Pin' : 'Add Pin'}</Text>}
          </Button>
        </ScrollView>
        <Overlay visible={this.state.modalVisible} onClose={this.onClose} animationType="zoomIn" containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          childrenWrapperStyle={{ backgroundColor: '#eee' }} animationDuration={500}>
          <Text style={styles.actionTitle}>Choice Action</Text>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(false, 1)} ><Text style={styles.buttonTitle}>Import Picture</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(false, 2)} ><Text style={styles.buttonTitle}>Import Video</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(false, 3)} ><Text style={styles.buttonTitle}>Import Audio</Text></Button>

          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(true, 1)} ><Text style={styles.buttonTitle}>Take Photo</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.choiceAcion(true, 2)} ><Text style={styles.buttonTitle}>Capture Video</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.showRecordModal()} ><Text style={styles.buttonTitle}>Record Audio</Text></Button>
          <Button style={styles.actionBtn} block onPress={() => this.setState({ modalVisible: false })} ><Text style={styles.buttonTitle}>Cancel</Text></Button>
        </Overlay>
        {this.state.recorderVisible && <Modal visible={true} animationType="zoomIn" transparent={false} containerStyle={styles.overlayContainer}
          childrenWrapperStyle={{ backgroundColor: 'red' }} animationDuration={5} closeOnTouchOutside>
          <Recorder onUpload={this.onSaveAudio} />
        </Modal>}
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
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    marginBottom: scale(10)
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