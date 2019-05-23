import {
  FACEBOOK_AUTH_REQUEST,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAILURE,
} from '../actions/authActions';

import { SET_USER } from '../actions/initActions';

const initialState = {
  token: null,
  user: {},
  isFacebookSignInLoading: false,
  isGoogleSignInLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case FACEBOOK_AUTH_REQUEST:
      return {
        ...state,
        isFacebookSignInLoading: true,
      };
    case FACEBOOK_AUTH_SUCCESS:
      return {
        ...state,
        isFacebookSignInLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case FACEBOOK_AUTH_FAILURE:
      return {
        ...state,
        isFacebookSignInLoading: false,
      };
    case GOOGLE_AUTH_REQUEST:
      return {
        ...state,
        isGoogleSignInLoading: true,
      };
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        isGoogleSignInLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case GOOGLE_AUTH_FAILURE:
      return {
        ...state,
        isGoogleSignInLoading: false,
      };
    default:
      return state;
  }
};
