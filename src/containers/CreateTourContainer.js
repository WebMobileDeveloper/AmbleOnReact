import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';

import { createTour } from '../actions/toursActions';
import { navigationPropTypes, navigationDefaultProps } from '../constants/propTypes';

import CreateTourScreen from '../screens/CreateTourScreen';
import { CreateTourSchema } from '../utils/validationSchemes';
import withKeyboardDismiss from '../hocs/withKeyboardDismiss';

class CreateTourContainer extends Component {
  state = {
    tourId: null,
  };

  handleSubmit = async () => {
    const { ownerId, values, navigation } = this.props;
    const { tourId } = this.state;
    if (!tourId) {
      this.props.createTour(ownerId, values, tourId => {
        this.setState({ tourId }, () => navigation.navigate('AddPins', { tourId }));
      });
    } else {
      navigation.navigate('AddPins', { tourId });
    }
  };

  render() {
    const {
      navigation,
      values,
      errors,
      isCreateTourLoading,
      isValid,
      dirty,
      touched,
      handleChange,
      handleBlur,
    } = this.props;
    const { tourId } = this.state;

    return (
      <CreateTourScreen
        headerTitle="Create Tour"
        buttonTitle={tourId ? 'Add more pins' : 'Save and add pins'}
        formValues={values}
        errors={errors}
        dirty={dirty}
        touched={touched}
        onGoBackPress={() => navigation.goBack()}
        handleChange={handleChange}
        isCreateTourLoading={isCreateTourLoading}
        isFormValid={isValid}
        handleBlur={handleBlur}
        handleCreateTourSubmit={this.handleSubmit}
      />
    );
  }
}

CreateTourContainer.propTypes = {
  navigation: navigationPropTypes,
  values: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  errors: PropTypes.object,
  isCreateTourLoading: PropTypes.bool,
  isValid: PropTypes.bool,
  dirty: PropTypes.bool,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

CreateTourContainer.defaultProps = {
  navigation: navigationDefaultProps,
  values: PropTypes.shape({
    title: '',
    description: '',
  }),
  errors: {},
  isCreateTourLoading: false,
  isValid: false,
  dirty: false,
  touched: {},
  handleChange: () => {},
  handleBlur: () => {},
};

const mapDispatchToProps = ({
  auth: {
    user: { id },
  },
  tours: { isCreateTourLoading },
}) => ({ ownerId: id, isCreateTourLoading });

export default compose(
  withKeyboardDismiss,
  connect(
    mapDispatchToProps,
    { createTour }
  ),
  withFormik({
    mapPropsToValues: () => ({ title: '', description: '' }),
    validationSchema: CreateTourSchema,
    displayName: 'CreateTourForm',
  })
)(CreateTourContainer);
