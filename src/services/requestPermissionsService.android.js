import { PermissionsAndroid } from 'react-native';

export default {
  location: async grantedCb => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED && grantedCb) grantedCb();
  },
};
