import { Alert } from 'react-native';

import { GoogleSignin , statusCodes} from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
  // webClientId: '291405854067-9rkuerlej7578rauhg085podmjcdhqme.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  webClientId: '377027305156-blqs6t3bvrgpo9b6qqftntdbhjlp4fuu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // webClientId: '377027305156-ngm9dd3a82ins4fao1gii9jnu275uv9p.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '291405854067-68mbhgpldam5hkn1rd3pisp8ihsg4k4l.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  iosClientId: '377027305156-308rjc8b3pb4krou3vmtkgebmtegqjcd.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default {
  facebook: async ({ success }) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      async result => {
        if (!result.isCancelled) {
          const { accessToken, userID } = await AccessToken.getCurrentAccessToken();
          success(accessToken, userID);
        }
      },
      error => Alert.alert(`Login fail with error: ${error}`)
    );
  },
  google: async ({ success }) => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // google services are available
    } catch (err) {
      console.error('play services are not available');
    }

    try {
      let user = await GoogleSignin.signIn();
      const {
        accessToken,
        user: { id: userId },
      } = user;
      console.log("+++ Accesstoken, userid", user);
      // const {
      //   accessToken,
      //   user: { id: userId },
      // } = await GoogleSignin.signIn();
      console.log("+++ Accesstoken, userid", accessToken, userId);
      success(accessToken, userId);
    } catch (error) {
      
      console.log('Message', error.message);
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  },
};
