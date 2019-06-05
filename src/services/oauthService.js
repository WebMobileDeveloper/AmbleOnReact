import { Alert } from 'react-native';

import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '291405854067-9rkuerlej7578rauhg085podmjcdhqme.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '291405854067-68mbhgpldam5hkn1rd3pisp8ihsg4k4l.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
      await GoogleSignin.hasPlayServices();
      const {
        accessToken,
        user: { id: userId },
      } = await GoogleSignin.signIn();
      success(accessToken, userId);
    } catch (error) {
      // alert(error)
      if (error.code === 'SIGN_IN_CANCELLED') {
        // user cancelled the login flow
      } else if (error.code === 'IN_PROGRESS') {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  },
};
