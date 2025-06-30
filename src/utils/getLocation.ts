import { LatLng, type LatLngExpression } from 'leaflet';

export const getLocation = (): Promise<LatLngExpression> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокация не поддерживается'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve(new LatLng(parseFloat(latitude.toFixed(4)), parseFloat(longitude.toFixed(4))));
      },
      error => {
        reject(new Error(`Ошибка: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};
