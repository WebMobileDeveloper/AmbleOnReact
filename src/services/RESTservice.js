import { create } from 'apisauce';
// import * as FD from 'form-data';
// var FormData = require('form-data');
import { storageService } from './storageService';
import navigationService from './navigationService';
import { HOST_ADDRESS } from '../Const';
const api = create({
  // baseURL: 'http://light-it-10.tk/api/',
  // baseURL: 'http://192.168.157.130:3000/api/',
  baseURL: HOST_ADDRESS + '/api/',
  timeout: 3000,
});

export const RESTService = {
  facebookSignIn: (accessToken, userId) =>
    api.post('auth/login/facebook/', { accessToken, userId }),
  googleSignIn: (accessToken, userId) => api.post('auth/login/google/', { accessToken, userId }),
  logout: () => api.post('auth/logout'),
  getTours: () => api.get('tour'),
  getPinsForTour: tourId => api.get(`tour/${tourId}/pin`),
  createTour: ({ title, description, ownerId }) =>
    api.post('tour', { title, description, ownerId }),
  createPin: (tourId, title, description, coordinate) =>
    api.post(`tour/${tourId}/pin/`, { tourId, title, description, coordinate }),
  createPinWithPhoto: async (tourId, title, description, coordinate, media_type, file = null) => {
    const formFile = new FormData();
    formFile.append('file', {
      name: file.name,
      uri: file.imagePath,
      type: file.type,
    });
    formFile.append('tourId', tourId);
    formFile.append('title', title);
    formFile.append('description', description);
    formFile.append('coordinate[latitude]', coordinate.latitude);
    formFile.append('coordinate[longitude]', coordinate.longitude);
    formFile.append('media_type', media_type);
    console.loe(formFile)
    return api.post(`tour/${tourId}/pin/`, formFile);
  },
  deletePin: (tourId, pinId) => api.delete(`tour/${tourId}/pin/${pinId}`),
  deleteTour: tourId => api.delete(`tour/${tourId}`),
};

export const setTokenToHeaders = token => {
  if (token) {
    api.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  } else {
    api.setHeaders({
      Authorization: null,
    });
  }
};

api.axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      originalRequest._retry = true;
      await storageService.removeItem('token');
      await storageService.removeItem('user');
      setTokenToHeaders();
      navigationService.navigate('AuthStack');
    }
    return Promise.reject(error);
  }
);
