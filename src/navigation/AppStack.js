import { createStackNavigator } from 'react-navigation';

import AddPinsContainer from '../containers/add_pins/AddPinsContainer';
import CreatePinContainer from '../containers/create_pin/CreatePinContainer';
import ToursListContainer from '../containers/tours_list/ToursListContainer';
import TourStartContainer from '../containers/tour_start/TourStartContainer';
import CreateTourContainer from '../containers/create_tour/CreateTourContainer';
import TourPreviewContainer from '../containers/tour_preview/TourPreviewContainer';
import CompletePinContainer from '../containers/complete_pin/CompletePinContainer';

export default createStackNavigator(
  {
    AddPins: AddPinsContainer,
    CreatePin: CreatePinContainer,
    ToursList: ToursListContainer,
    TourStart: TourStartContainer,
    CreateTour: CreateTourContainer,
    TourPreview: TourPreviewContainer,
    CompletePin: CompletePinContainer,
  },
  {
    initialRouteName: 'ToursList',
    // initialRouteName: 'CreatePin',
    headerMode: 'none',
  }
);
