import { Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../data/locations';

/**
 * Transparent invisible hit-zone placed over each baked-in marker.
 * The visual markers already exist in snakefat_map.png; Leaflet only
 * needs to capture the hover events.
 *
 * iconAnchor = [half-width, full-height] → the bottom-centre tip of
 * the marker icon aligns with the `position` coordinate.
 */
const ZONE_W = 31;   // 1/8 of marker.png width (244)
const ZONE_H = 55;   // 1/8 of marker.png height (442)

function createHoverIcon(clickable) {
  const html = clickable
    ? '<img src="/images/marker.png" class="marker-default-img" alt="" /><img src="/images/markerHover.png" class="marker-hover-img" alt="" />'
    : '<img src="/images/marker.png" class="marker-default-img" alt="" />';
  
  return L.divIcon({
    className: clickable ? 'marker-hit-zone marker-hit-zone--clickable' : 'marker-hit-zone',
    html,
    iconSize:   [ZONE_W, ZONE_H],
    iconAnchor: [ZONE_W / 2, ZONE_H],
  });
}

export default function MapMarkers({ onShow, onHide }) {
  const map      = useMap();
  const navigate = useNavigate();

  const handleMouseOver = useCallback(
    (e, location) => {
      const point = map.latLngToContainerPoint(e.latlng);
      onShow(location, { x: point.x, y: point.y });
    },
    [map, onShow]
  );

  return locations.map((location) => {
    const clickable = Boolean(location.detailpage);
    return (
      <Marker
        key={location.id}
        position={location.position}
        icon={createHoverIcon(clickable)}
        eventHandlers={{
          mouseover: (e) => handleMouseOver(e, location),
          mouseout:  ()  => onHide(),
          click:     ()  => { if (clickable) navigate(`/location/${location.id}`); },
        }}
      />
    );
  });
}

