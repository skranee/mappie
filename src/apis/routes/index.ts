import type { Profile, RouteInfo } from '@/types/apis/osrm.ts';

export default class RoutesAPI {
  public static async get(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    profile: Profile = 'driving'
  ): Promise<RouteInfo> {
    const coords = `${lon1},${lat1};${lon2},${lat2}`;
    const serviceUrl = import.meta.env.VITE_OSRM_API_URL;
    const params = new URLSearchParams({
      overview: 'false',
      alternatives: 'false',
      steps: 'false',
    });
    const url = `${serviceUrl}/${profile}/${coords}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OSRM error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.code !== 'Ok' || !Array.isArray(data.routes) || data.routes.length === 0) {
      throw new Error(`Маршрут не найден или ошибка: ${data.code}`);
    }

    const route = data.routes[0];
    return {
      distance: route.distance,
      duration: route.duration,
    };
  }
}
