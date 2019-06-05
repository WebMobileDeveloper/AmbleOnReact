import polyline from '@mapbox/polyline';
import mapConsts from '../constants/mapConstants';

export const getRoutArray = pinsArray =>
  new Promise(resolve => {
    const url = polylineUrlGenerator(pinsArray);
    if (url) {
      fetch(url).then(res => {
        if (res.ok) {
          const polylineArray = [];
          const apiRessponse = JSON.parse(res._bodyInit);

          // decode form polyline to array of arrays
          const decodePolylineArray = polyline.decode(
            apiRessponse.routes[0].overview_polyline.points
          );

          // create objects (change from array of arrays to array of objects) with {latitude} {longitude} row for MapView.Polyline
          decodePolylineArray.forEach(item => {
            polylineArray.push({ latitude: item[0], longitude: item[1] });
          });
          resolve(polylineArray);
        } else {
          // if something goes wrong :)
          resolve([]);
        }
      });
    } else {
      resolve([]);
    }
  });

export const polylineUrlGenerator = pinsArray => {
  const { directionUrl, walkingMode } = mapConsts;
  let url = directionUrl;

  // if we dont need generate url
  if (pinsArray.length < 2) return false;

  // if we have only two point and dont need {waypoints} in request, variable url will not change
  if (pinsArray.length === 2) {
    const destLat = pinsArray[1].coordinate.latitude;
    const destLon = pinsArray[1].coordinate.longitude;
    const originLat = pinsArray[0].coordinate.latitude;
    const originLon = pinsArray[0].coordinate.longitude;
    return `${url}origin=${originLat},${originLon}&destination=${destLat},${destLon}&${walkingMode}&key=${
      mapConsts.apiKey
    }`;
  }

  // if we have many points, we need {waypoints} in request, variable url will be change only at this case
  pinsArray.forEach((item, index, array) => {
    const { latitude, longitude } = item.coordinate;
    if (index === 0) {
      url += `origin=${latitude},${longitude}`;
    } else if (index === 1) {
      url += `&waypoints=via:${latitude}%2C${longitude}`;
    } else if (index === array.length - 1) {
      url += `&destination=${latitude},${longitude}&${walkingMode}&key=${mapConsts.apiKey}`;
    } else {
      url += `%7Cvia:${latitude}%2C${longitude}`;
    }
  });
  return url;
};

// these are constants that we used =>

// directionUrl: 'https://maps.googleapis.com/maps/api/directions/json?',
// walkingMode: 'mode=walking',
// apiKey: generate it ket at https://developers.google.com/maps/documentation/directions/start
