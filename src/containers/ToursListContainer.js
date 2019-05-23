import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ToursListScreen from '../screens/ToursListScreen';

import { logout } from '../actions/authActions';

import { getTours } from '../actions/toursActions';
import { navigationPropTypes, navigationDefaultProps } from '../constants/propTypes';

class ToursListContainer extends Component {
  componentDidMount() {
    const { getTours } = this.props;
    getTours();
  }

  logout = () => {
    const { navigation, logout } = this.props;
    logout(() => navigation.navigate('AuthStack'));
  };

  render() {
    const { toursList, navigation } = this.props;
    return (
      <ToursListScreen
        toursList={toursList}
        onAddTourPress={() => navigation.navigate('CreateTour')}
        onLogoutPress={this.logout}
        navigation={navigation}
      />
    );
  }
}

ToursListContainer.propTypes = {
  navigation: navigationPropTypes,
  toursList: PropTypes.array,
  getTours: PropTypes.func,
  logout: PropTypes.func,
};

ToursListContainer.defaultProps = {
  navigation: navigationDefaultProps,
  toursList: [],
  getTours: () => {},
  logout: () => {},
};

const mapDispatchToProps = ({ tours: { toursList } }) => ({ toursList });

export default connect(
  mapDispatchToProps,
  { logout, getTours }
)(ToursListContainer);
