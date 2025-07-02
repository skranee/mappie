import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import L from 'leaflet';

import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setFromName, setToName } from '@/store/slices/RouteSlice.ts';

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import 'leaflet-routing-machine';

export const Routing = () => {
  const map = useMap();
  const dispatch = useAppDispatch();

  const landmarks = useAppSelector(state => state.map.landmarks);
  const { from, to } = useAppSelector(state => state.route);

  useEffect(() => {
    if (!map || !from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from), L.latLng(to)],
      routeWhileDragging: true,
      addWaypoints: false,
      waypointMode: 'connect',
      lineOptions: {
        styles: [{ color: 'blue', weight: 8 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0.1,
        addWaypoints: false,
        pane: 'overlayPane',
      },
      show: false,
      createMarker: () => null,
    }).addTo(map);

    routingControl.on('routesfound', () => {
      const startLat = L.latLng(from).lat;
      const startLon = L.latLng(from).lng;
      const startName = landmarks.find(
        place => place.lat === startLat && place.lon === startLon
      )?.name;

      const endLat = L.latLng(to).lat;
      const endLon = L.latLng(to).lng;
      const endName = landmarks.find(place => place.lat === endLat && place.lon === endLon)?.name;
      dispatch(setFromName(startName ?? from.toString()));
      dispatch(setToName(endName ?? to.toString()));
    });

    return () => {
      if (map) {
        map.removeControl(routingControl);
      }
    };
  }, [map, from, to, dispatch, landmarks]);

  return null;
};
