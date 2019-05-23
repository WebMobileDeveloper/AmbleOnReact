import { createStackNavigator } from 'react-navigation';

import AddPinsContainer from '../containers/AddPinsContainer';
import CreatePinContainer from '../containers/CreatePinContainer';
import ToursListContainer from '../containers/ToursListContainer';
import TourStartContainer from '../containers/TourStartContainer';
import CreateTourContainer from '../containers/CreateTourContainer';
import TourPreviewContainer from '../containers/TourPreviewContainer';
import CompletePinContainer from '../containers/CompletePinContainer';

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
    headerMode: 'none',
  }
);
