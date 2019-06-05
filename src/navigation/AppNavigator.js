import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

import AuthLoading from '../components/AuthLoading';

const AppNavigator = createSwitchNavigator(
  {
    AppStack,
    AuthStack,
    AuthLoading,
  },
  {
    initialRouteName: 'AuthLoading',
    // initialRouteName: 'AppStack',
  }
);

export default createAppContainer(AppNavigator);
