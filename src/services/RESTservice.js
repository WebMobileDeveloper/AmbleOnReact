import { create } from 'apisauce';
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
  facebookSignIn: (accessToken, userId) => api.post('auth/login/facebook/', { accessToken, userId }),
  googleSignIn: (accessToken, userId) => {
    console.log("accessToken, userId ====",accessToken, userId );
    return api.post('auth/login/google/', { accessToken, userId })
  },
  logout: () => api.post('auth/logout'),
  getTours: () => api.get('tour'),
  getPinsForTour: tourId => api.get(`tour/${tourId}/pin`),
  createTour: ({ title, description, ownerId }) => api.post('tour', { title, description, ownerId }),
  createPin: (tourId, title, description, coordinate) => api.post(`tour/${tourId}/pin/`, { tourId, title, description, coordinate }),
  createPinWithMedia: async (tourId, title, description, coordinate, media_type, file) => {
    const body = new FormData();
    body.append('file', {
      name: file.name,
      uri: file.imagePath,
      type: file.type,
    });
    body.append('tourId', tourId);
    body.append('title', title);
    body.append('description', description);
    body.append('coordinate[latitude]', coordinate.latitude);
    body.append('coordinate[longitude]', coordinate.longitude);
    body.append('media_type', media_type);
    return api.post(`tour/${tourId}/pin/`, body);
  },
  addAttachment: async (pinId, media_type, file) => {
    const body = new FormData();
    body.append('file', {
      name: file.name,
      uri: file.imagePath,
      type: file.type,
    });
    body.append('media_type', media_type);
    const result = api.post(`pin/${pinId}/attachment/`, body);
    return result;
  },
  deletePin: (tourId, pinId) => api.delete(`tour/${tourId}/pin/${pinId}`),
  deleteTour: tourId => api.delete(`tour/${tourId}`),
  create_feedback: (userId, tourId, rate) => api.post(`rating/`, { userId, tourId, rate }),
  update_feedback: (id, rate) => api.post(`rating/${id}`, { rate }),
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
