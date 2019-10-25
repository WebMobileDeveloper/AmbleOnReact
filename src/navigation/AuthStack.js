import { createStackNavigator } from 'react-navigation';

import LoginContainer from '../containers/login/LoginContainer';

export default createStackNavigator(
  {
    Login: LoginContainer,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);
