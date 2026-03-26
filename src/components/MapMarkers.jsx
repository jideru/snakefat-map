import { Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useCallback } from 'react';
import { locations } from '../data/locations';

/**
 * Transparent invisible hit-zone placed over each baked-in marker.
 * The visual markers already exist in snakefat_map.png; Leaflet only
 * needs to capture the hover events.
 *
 * iconAnchor = [half-width, full-height] → the bottom-centre tip of
 * the marker icon aligns with the `position` coordinate.
 */
const ZONE_W = 60;
const ZONE_H = 110;

function createHoverIcon() {
  return L.divIcon({
    className: 'marker-hit-zone',
    html: '',
    iconSize:   [ZONE_W, ZONE_H],
    iconAnchor: [ZONE_W / 2, ZONE_H],
  });
}

export default function MapMarkers({ onShow, onHide }) {
  const map = useMap();

  const handleMouseOver = useCallback(
    (e, location) => {
      const point = map.latLngToContainerPoint(e.latlng);
      onShow(location, { x: point.x, y: point.y });
    },
    [map, onShow]
  );

  return locations.map((location) => (
    <Marker
      key={location.id}
      position={location.position}
      icon={createHoverIcon()}
      eventHandlers={{
        mouseover: (e) => handleMouseOver(e, location),
        mouseout:  ()  => onHide(),
      }}
    />
  ));
}
