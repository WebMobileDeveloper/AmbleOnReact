/* eslint-disable global-require */
import { HOST_ADDRESS } from '../Const';
export default {
  google_icon: require('../assets/images/google.png'),
  facebook_icon: require('../assets/images/facebook.png'),
  plus: require('../assets/images/plus.png'),
  tour_avata: require('../assets/images/avata.png'),
  arrow_left: require('../assets/images/arrow_left.png'),
  map_marker: require('../assets/images/map_marker.png'),
  backImage: require('../assets/images/back.png'),
  completeMarkerImage: require('../assets/images/map_marker_complete.png'),
  incompleteMarkerImage: require('../assets/images/map_marker.png'),
  closeButton: require('../assets/images/closeButton.png'),
  // imageServiceUrl: 'http://light-it-10.tk/uploads/',
  // imageServiceUrl: 'http://192.168.157.130:3000/files/',
  imageServiceUrl: (HOST_ADDRESS + '/files/'),
};
