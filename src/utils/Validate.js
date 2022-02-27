import Toast from 'react-native-simple-toast';

export function validateCoordinates(longitude,latitude) {
  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);

  //180 < lng < 180 && -90 < lat < 90 for world coordinates
  //68.7 < lng < 97.25 && 8.4 < lat < 37.6 for Indian coordinates
  if (longitude === '' && latitude === '') {
    Toast.show("Values can't empty", Toast.SHORT);
    return false;
  }
  if (!longitude.includes(',') && !latitude.includes(',')) {
    if (
      lng > 68.7 &&
      lng < 97.25 &&
      lat > 8.4 &&
      lat < 37.6 &&
      lng != 0 &&
      lat !== 0
    ) {
      return true;
    }
  }

  Toast.show(
    'please enter valid coordinates(India)...',
    Toast.SHORT,
  );
  return false;
}
function  getFormattedDuration(duration) {
  let min = parseInt((duration % 3600) / 60);
  let hours = parseInt((duration % 86400) / 3600);
  let days = parseInt(duration / 86400);
  if (days > 0) {
    return (
      days +
      ' ' +
      (days > 1 ? 'Days' : 'Day') +
      ' ' +
      hours +
      ' ' +
      'hr' +
      (min > 0 ? ' ' + min + ' ' + 'min.' : '')
    );
  } else {
    return hours > 0
      ? hours + ' ' + 'hr' + (min > 0 ? ' ' + min + ' ' + 'min' : '')
      : min + ' ' + 'min.';
  }
}