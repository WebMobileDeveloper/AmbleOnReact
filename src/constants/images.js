/* eslint-disable global-require */
import { HOST_ADDRESS } from '../Const';
export default {
  google_icon: require('../assets/images/google.png'),
  facebook_icon: require('../assets/images/facebook.png'),
  plus: require('../assets/images/plus.png'),
  tour_image_placeholder: require('../assets/images/tour_image_placeholder.png'),
  arrow_left: require('../assets/images/arrow_left.png'),
  map_marker: require('../assets/images/map_marker.png'),
  // imageServiceUrl: 'http://light-it-10.tk/uploads/',
  // imageServiceUrl: 'http://192.168.157.130:3000/files/',
  imageServiceUrl: HOST_ADDRESS + '/files/',
};
