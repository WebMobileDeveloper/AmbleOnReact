import React, { Component } from 'react';
import { Platform } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import { getFileName, getFileExtention } from '../../utils/imagePickerUtils';
import withKeyboardDismiss from '../../hocs/withKeyboardDismiss';
import { addPinToTour, addAttachmentToPin } from '../../actions/toursActions';
import { CreateTourSchema } from '../../utils/validationSchemes';
import CreatePinScreen from './CreatePinScreen';

class CreatePinContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { recorderVisible: false, pinId: null }
    this.handleCreatePinSubmit = this.handleCreatePinSubmit.bind(this);
    this.saveRecordAudio = this.saveRecordAudio.bind(this);
    this.openPicker = this.openPicker.bind(this);

  }


  handleCreatePinSubmit = (media_type, formdata) => {
    const { values, navigation } = this.props;
    const tourId = navigation.getParam('tourId');
    const coordinate = navigation.getParam('coordinate');
    if (this.state.pinId) {
      this.handleAddAttachmentSubmit(media_type, formdata);
    } else {
      if (formdata) {
        this.props.addPinToTour(tourId, values, coordinate, (pinId) => this.createPinSuccess(pinId), media_type, formdata);
      } else {
        this.props.addPinToTour(tourId, values, coordinate, (pinId) => this.createPinSuccess(pinId), media_type);
      }
    }
  };

  handleAddAttachmentSubmit = (media_type, formdata) => {
    if (formdata) {
      this.props.addAttachmentToPin(this.state.pinId, media_type, formdata, () => this.addAttachmentSuccess);
    } else {
      this.addAttachmentFail()
    }
  };

  createPinSuccess = (pinId) => {
    this.setState({ pinId: pinId })
  }
  addAttachmentSuccess = () => {
    console.log("====attachment succeess")
  }
  addAttachmentFail = () => {
    console.log("there isn't form data")
  }
  openPicker = (isNeedCamera, media_type) => {
    if (isNeedCamera) {
      if (media_type == 1) {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        }).then(async image => {
          console.log("image",image);
          const fileName = getFileName(image.path);
          const fileExtension = getFileExtention(image.path);
          // const final_filename = Platform.OS === 'ios' ? image.filename : `${fileName}${fileExtension}`;
          const final_filename = `${fileName}${fileExtension}`;
          const file = {
            imagePath: image.path,
            type: `image/${fileExtension}`,
            name: final_filename,
          };
          this.handleCreatePinSubmit(media_type, file);
        }).catch(err => { });
      } else if (media_type == 2) {
        ImagePicker.openCamera({
          mediaType: 'video',
        }).then(async image => {
          const fileName = getFileName(image.path);
          const fileExtension = getFileExtention(image.path);
          const final_filename = Platform.OS === 'ios' ? image.filename : `${fileName}${fileExtension}`;
          const file = {
            imagePath: image.path,
            type: `image/${fileExtension}`,
            name: final_filename,
          }
          this.handleCreatePinSubmit(media_type, file);
        }).catch(err => { });
      } else {
        this.setState({ recorderVisible: true })
      }
    } else {
      if (media_type == 1) {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then(async image => {
          const fileName = getFileName(image.path);
          const fileExtension = getFileExtention(image.path);
          const final_filename = Platform.OS === 'ios' ? image.filename : `${fileName}${fileExtension}`;
          const file = {
            imagePath: image.path,
            type: `image/${fileExtension}`,
            name: final_filename,
          }
          this.handleCreatePinSubmit(media_type, file);
        }).catch(err => { });
      } else if (media_type == 2) {
        ImagePicker.openPicker({
          mediaType: 'video',
        }).then(async image => {
          const fileName = getFileName(image.path);
          const fileExtension = getFileExtention(image.path);
          const final_filename = Platform.OS === 'ios' ? image.filename : `${fileName}${fileExtension}`;
          const file = {
            imagePath: image.path,
            type: `video/${fileExtension}`,
            name: final_filename,
          }
          this.handleCreatePinSubmit(media_type, file);
        }).catch(err => { });
      } else {
        // if (Platform.isPad) {
        //   const { pageX, pageY } = event.nativeEvent;
        //   DocumentPicker.show({
        //     top: pageY,
        //     left: pageX,
        //     filetype: [DocumentPickerUtil.audio()],
        //   }, (error, url) => {
        //     if (error) return;
        //     const fileName = getFileName(url);
        //     const fileExtension = getFileExtention(url);
        //     const final_filename = `${fileName}${fileExtension}`;
        //     const file = {
        //       imagePath: url,
        //       type: `audio/${fileExtension}`,
        //       name: final_filename,
        //     }
        //     this.handleCreatePinSubmit(media_type, file);
        //   });
        // } else {
        DocumentPicker.show({
          filetype: [DocumentPickerUtil.audio()],
        }, (error, res) => {
          if (error) return;
          const fileExtension = getFileExtention(res.uri);
          const file = {
            imagePath: res.uri,
            type: `audio/${fileExtension}`,
            name: res.fileName,
          }
          this.handleCreatePinSubmit(media_type, file);
        });
        // }
      }
    }
  };

  saveRecordAudio = (uri) => {
    const fileName = getFileName(uri);
    const fileExtension = getFileExtention(uri);
    const final_filename = `${fileName}${fileExtension}`;
    const file = {
      imagePath: uri,
      type: `audio/${fileExtension}`,
      name: final_filename,
    }
    this.handleCreatePinSubmit(3, file);
  }
  render() {
    const { navigation, values, errors, isCreatePinLoading, isValid, dirty, touched, handleChange, handleBlur, } = this.props;

    return (
      <CreatePinScreen
        formValues={values}
        errors={errors}
        dirty={dirty}
        touched={touched}
        handleChange={handleChange}
        isCreatePinLoading={isCreatePinLoading}
        isFormValid={isValid}
        handleBlur={handleBlur}
        openPicker={this.openPicker}
        saveRecordAudio={this.saveRecordAudio}
        handleCreatePinSubmit={this.handleCreatePinSubmit}
        recorderVisible={this.state.recorderVisible}
        onLeftPress={() => navigation.goBack()}
        pinId={this.state.pinId}
      />
    );
  }
}
CreatePinContainer.propTypes = {
  values: PropTypes.object,
  navigation: PropTypes.object,
  isCreatePinLoading: PropTypes.bool,
};
const mapStateToProps = ({ tours: { isCreatePinLoading } }) => ({
  isCreatePinLoading,
});

export default compose(
  withKeyboardDismiss,
  connect(
    mapStateToProps,
    { addPinToTour, addAttachmentToPin }
  ),
  withFormik({
    mapPropsToValues: () => ({ title: '', description: '' }),
    validationSchema: CreateTourSchema,
    displayName: 'CreatePinForm',
  })
)(CreatePinContainer);
