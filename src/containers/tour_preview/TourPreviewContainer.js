import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import networkErrorHandler from '../../utils/networkErrorHandler';
import { create_feedback, update_feedback } from '../../actions/toursActions';
import TourPreviewScreen from './TourPreviewScreen';
import { propTypes, defalutProps } from './ref';

class TourPreviewContainer extends Component {
  static propTypes = propTypes;
  static defalutProps = defalutProps;
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      ratingId: null,
      originRate: 0,
      newRate: 0,
    }
  }
  navigateStartTour = () => {
    const { currTour, navigation } = this.props;
    if (currTour.pins.length === 0) {
      networkErrorHandler('Tour finish');
    } else {
      navigation.navigate('TourStart', currTour);
    }
  };
  onShowFeedbackOverlay = () => {
    const { currTour, user } = this.props;
    if (currTour.ownerId == user.id) {
      Alert.alert("You can't give feedback to own tour.")
    } else {
      let originRate = 0;
      let newRate = 0;
      let ratingId = null;
      currTour.ratings.map(rating => {
        if (rating.userId == user.id) {
          originRate = rating.rate;
          newRate = rating.rate;
          ratingId = rating.id;
        }
      })
      this.setState({ showOverlay: true, originRate, newRate, ratingId });
    }
  }
  onCloseOverlay = () => {
    this.setState({ showOverlay: false })
  }
  onGiveFeedback = () => {
    const { currTour, user, create_feedback, update_feedback } = this.props;
    const { newRate, ratingId } = this.state;
    if (ratingId) {
      update_feedback(ratingId, newRate, () => this.setState({ showOverlay: false }));
    } else {
      create_feedback(user.id, currTour.id, newRate, () => this.setState({ showOverlay: false }));
    }
  }
  ratingCompleted = (newRate) => {
    this.setState({ newRate });
  }
  render() {
    const { currTour, navigation } = this.props;
    return (
      <TourPreviewScreen
        currTour={currTour}
        navigation={navigation}
        showOverlay={this.state.showOverlay}
        newRate={this.state.newRate}

        navigateStartTour={this.navigateStartTour}
        onShowFeedbackOverlay={this.onShowFeedbackOverlay}
        onCloseOverlay={this.onCloseOverlay}
        onGiveFeedback={this.onGiveFeedback}
        ratingCompleted={this.ratingCompleted}
      />
    );
  }
}

const mapStateToProps = ({ tours: { currTour, currTourId }, auth: { user } }) => ({
  currTour, currTourId, user
});
const mapDispatchToProps = { create_feedback, update_feedback }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourPreviewContainer);
