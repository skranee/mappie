import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface Control extends L.Control {
      on(type: string, fn: (e: unknown) => void, context?: unknown): this;
      off(type: string, fn?: (e: unknown) => void, context?: unknown): this;
    }

    interface LineOptions {
      styles: L.PathOptions[];
      extendToWaypoints?: boolean;
      missingRouteTolerance?: number;
      addWaypoints?: boolean;
      pane?: string;
    }

    interface ControlOptions {
      waypoints?: L.LatLngExpression[];
      routeWhileDragging?: boolean;
      addWaypoints?: boolean;
      waypointMode?: string;
      lineOptions?: LineOptions;
      showAlternatives?: boolean;
      show?: boolean;
      createMarker?: (i: number, wp: unknown, n: number) => L.Marker | null;
    }

    function control(options?: ControlOptions): Control;
  }
}
