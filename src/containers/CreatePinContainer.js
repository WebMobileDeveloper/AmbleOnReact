import React, { Component } from 'react';
import { Platform } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
// import RNFetchBlob from 'react-native-fetch-blob';

import { getFileName, getFileExtention } from '../utils/imagePickerUtils';
import withKeyboardDismiss from '../hocs/withKeyboardDismiss';
import CreatePinScreen from '../screens/CreatePinScreen';
import { addPinToTour } from '../actions/toursActions';
import { CreateTourSchema } from '../utils/validationSchemes';

class CreatePinContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { recorderVisible: false }
    this.handleCreatePinSubmit = this.handleCreatePinSubmit.bind(this);
    this.saveRecordAudio = this.saveRecordAudio.bind(this);
    this.openPicker = this.openPicker.bind(this);

  }


  handleCreatePinSubmit = (media_type, formdata) => {
    const { values, navigation } = this.props;
    const tourId = navigation.getParam('tourId');
    const coordinate = navigation.getParam('coordinate');
    if (formdata) {
      this.props.addPinToTour(tourId, values, coordinate, () => navigation.goBack(), media_type, formdata);
    } else {
      this.props.addPinToTour(tourId, values, coordinate, () => navigation.goBack(), media_type);
    }
  };

  openPicker = (isNeedCamera, media_type) => {
    if (isNeedCamera) {
      if (media_type == 1) {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        }).then(async image => {
          const fileName = getFileName(image.path);
          const fileExtension = getFileExtention(image.path);
          const final_filename = Platform.OS === 'ios' ? image.filename : `${fileName}${fileExtension}`;
          this.handleCreatePinSubmit(media_type, {
            imagePath: image.path,
            type: `image/${fileExtension}`,
            name: final_filename,
          });
        }).catch(err => { });
      } else if (media_type == 2) {
        ImagePicker.openCamera({
          mediaType: 'video',
        }).then(async image => {
          const fileName = getFileName(image.path);
          const fileExtension = getFileExtention(image.path);
          const final_filename = Platform.OS === 'ios' ? image.filename : `${fileName}${fileExtension}`;
          this.handleCreatePinSubmit(media_type, {
            imagePath: image.path,
            type: `video/${fileExtension}`,
            name: final_filename,
          });
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
          console.log("file======", file)
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
          console.log("file======", file)
          this.handleCreatePinSubmit(media_type, file);
        }).catch(err => { });
      } else {
        if (Platform.isPad) {

          const { pageX, pageY } = event.nativeEvent;

          DocumentPicker.show({
            top: pageY,
            left: pageX,
            filetype: [DocumentPickerUtil.audio()],
          }, (error, url) => {
            if (error) return;
            const fileName = getFileName(url);
            const fileExtension = getFileExtention(url);
            const final_filename = `${fileName}${fileExtension}`;
            const file = {
              imagePath: url,
              type: `audio/${fileExtension}`,
              name: final_filename,
            }
            console.log("file======", file)
            this.handleCreatePinSubmit(media_type, file);
          });
        } else {
          DocumentPicker.show({
            filetype: [DocumentPickerUtil.audio()],
          }, (error, res) => {
            if (error) return;
            console.log("audio picker res======", res)
            const fileExtension = getFileExtention(res.uri);
            const file = {
              imagePath: res.uri,
              type: `audio/${fileExtension}`,
              name: res.fileName,
            }
            console.log("file======", file)
            this.handleCreatePinSubmit(media_type, file);

            // RNFetchBlob.fs.stat(res.uri)
            //   .then((stats) => {
            //     console.log("audio picker RNFetchBlob stats======", stats)
            //   })
            //   .catch((err) => {
            //     console.log("audio picker RNFetchBlob err======", err)
            //   })

          });
        }
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
    console.log("recorder file=======", file);
    this.handleCreatePinSubmit(3, file);
  }
  render() {
    const {
      navigation,
      values,
      errors,
      // isCreatePinLoading,
      isValid,
      dirty,
      touched,
      // handleChange,
      // handleBlur,
    } = this.props;

    return (
      <CreatePinScreen
        formValues={values}
        errors={errors}
        dirty={dirty}
        touched={touched}
        handleChange={this.props.handleChange}
        isCreatePinLoading={this.props.isCreatePinLoading}
        isFormValid={isValid}
        handleBlur={this.props.handleBlur}
        openPicker={this.openPicker}
        saveRecordAudio={this.saveRecordAudio}
        handleCreatePinSubmit={this.handleCreatePinSubmit}
        recorderVisible={this.state.recorderVisible}
        onLeftPress={() => navigation.goBack()}
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
    { addPinToTour }
  ),
  withFormik({
    mapPropsToValues: () => ({ title: '', description: '' }),
    validationSchema: CreateTourSchema,
    displayName: 'CreatePinForm',
  })
)(CreatePinContainer);
