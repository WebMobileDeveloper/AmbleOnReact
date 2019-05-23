import { RESTService, setTokenToHeaders } from '../services/RESTservice';
import { storageService } from '../services/storageService';
import networkErrorHandler from '../utils/networkErrorHandler';
import { setUser } from './initActions';

export const FACEBOOK_AUTH_REQUEST = 'FACEBOOK_AUTH_REQUEST';
export const FACEBOOK_AUTH_SUCCESS = 'FACEBOOK_AUTH_SUCCESS';
export const FACEBOOK_AUTH_FAILURE = 'FACEBOOK_AUTH_FAILURE';

export const GOOGLE_AUTH_REQUEST = 'GOOGLE_AUTH_REQUEST';
export const GOOGLE_AUTH_SUCCESS = 'GOOGLE_AUTH_SUCCESS';
export const GOOGLE_AUTH_FAILURE = 'GOOGLE_AUTH_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const facebookSignInCreator = () => ({ type: FACEBOOK_AUTH_REQUEST });
export const googleSignInCreator = () => ({ type: GOOGLE_AUTH_REQUEST });
export const logoutCreator = () => ({ type: LOGOUT_REQUEST });

export const facebookSignIn = ({ accessToken, userId, cb }) => async dispatch => {
  dispatch(facebookSignInCreator());
  try {
    const response = await RESTService.facebookSignIn(accessToken, userId);
    if (response.ok) {
      const {
        data: { token, user },
      } = response;
      storageService.setItem('token', token);
      storageService.setItem('user', user);
      setTokenToHeaders(token);
      dispatch({ type: FACEBOOK_AUTH_SUCCESS, payload: { token, user } });
      if (cb) cb();
    } else {
      dispatch({ type: FACEBOOK_AUTH_FAILURE });
      networkErrorHandler(response.problem);
    }
  } catch (error) {
    console.warn('error', error);
  }
};

export const googleSignIn = ({ accessToken, userId, cb }) => async dispatch => {
  dispatch(googleSignInCreator());

  try {
    const response = await RESTService.googleSignIn(accessToken, userId);
    if (response.ok) {
      const {
        data: { token, user },
      } = response;
      await storageService.setItem('token', token);
      await storageService.setItem('user', user);
      setTokenToHeaders(token);
      dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: { token, user } });
      if (cb) cb();
    } else {
      dispatch({ type: GOOGLE_AUTH_FAILURE });
      networkErrorHandler(response.problem);
    }
  } catch (error) {
    console.warn('error', error);
  }
};

export const logout = cb => async dispatch => {
  dispatch(logoutCreator());
  try {
    const response = await RESTService.logout();
    if (response.ok) {
      await storageService.removeItem('token');
      await storageService.removeItem('user');
      setTokenToHeaders();
      setUser();
      dispatch({ type: LOGOUT_SUCCESS });
      if (cb) cb();
    } else {
      dispatch({ type: LOGOUT_FAILURE });
      networkErrorHandler(response.problem);
    }
  } catch (err) {
    console.warn('logout', err);
  }
};
