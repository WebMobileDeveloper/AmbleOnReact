import { createStackNavigator } from 'react-navigation';

import LoginContainer from '../containers/LoginContainer';

export default createStackNavigator(
  {
    Login: LoginContainer,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);
