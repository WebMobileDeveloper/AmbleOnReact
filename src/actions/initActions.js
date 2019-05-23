import { storageService } from '../services/storageService';
import { setTokenToHeaders } from '../services/RESTservice';

export const SET_USER = 'SET_USER';

export const setUser = (token, user) => ({ type: SET_USER, payload: { token, user } });

export const initUser = cb => async dispatch => {
  const token = await storageService.getItem('token');
  const user = await storageService.getItem('user');
  if (token && user) {
    setTokenToHeaders(token);
    dispatch(setUser(token, user));
  }
  if (cb) cb(token);
};
