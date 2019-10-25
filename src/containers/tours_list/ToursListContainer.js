import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { request_tour, getTours } from '../../actions/toursActions';
import * as Ref from './ref';
import ToursListScreen from './ToursListScreen';

class ToursListContainer extends Component {

  static propTypes = Ref.containerPropTypes;
  static defaultProps = Ref.containerDefaultProps;

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.showTourPreview = this.showTourPreview.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  componentDidMount() {
    this.props.getTours();
  }
  updateSearch = searchText => {
    this.setState({ searchText });
  };
  showTourPreview = (tourData) => {
    const { request_tour, navigation: { navigate } } = this.props;
    request_tour(tourData.id);
    navigate('TourPreview');
  }
  onLogout = () => {
    const { logout, navigation: { navigate } } = this.props;
    logout(() => navigate('AuthStack'));
  };

  render() {
    const { toursList, navigation: { navigate } } = this.props;
    const { searchText } = this.state;
    const renderItems = toursList.filter(item => !(searchText && !item.title.includes(searchText) && !item.description.includes(searchText)))

    return (
      <ToursListScreen
        searchText={searchText}
        renderItems={renderItems}
        navigate={navigate}
        onLogoutPress={this.onLogout}
        onUpdateSearch={this.updateSearch}
        onShowTourPreview={this.showTourPreview}
      />
    );
  }
}

const mapStateToProps = ({ tours: { toursList } }) => ({ toursList });
const mapDispatchToProps = { logout, getTours, request_tour };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToursListContainer);
