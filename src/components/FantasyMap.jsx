import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useState, useCallback, useRef, useEffect } from 'react';
import MapMarkers from './MapMarkers';
import HoverCard from './HoverCard';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../data/locations';

const IMAGE_BOUNDS = [
  [0, 0],
  [IMAGE_HEIGHT, IMAGE_WIDTH],
];

/** Forces the map to fit the full image on mount and on window resize. */
function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const fit = () => map.fitBounds(IMAGE_BOUNDS, { animate: false });
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [map]);
  return null;
}

export default function FantasyMap() {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [cardPosition, setCardPosition]       = useState({ x: 0, y: 0 });
  const hideTimer = useRef(null);

  const showCard = useCallback((location, point) => {
    clearTimeout(hideTimer.current);
    setHoveredLocation(location);
    setCardPosition(point);
  }, []);

  const hideCard = useCallback(() => {
    hideTimer.current = setTimeout(() => setHoveredLocation(null), 120);
  }, []);

  return (
    <div className="map-wrapper">
      <a href="https://snakefat-home.vercel.app/" className="map-home-button" target="_blank" rel="noopener noreferrer" title="Go to Snakefat home">Home</a>
      <MapContainer
        crs={L.CRS.Simple}
        bounds={IMAGE_BOUNDS}
        className="map-container"
        maxBounds={[
          [-200, -200],
          [IMAGE_HEIGHT + 200, IMAGE_WIDTH + 200],
        ]}
        maxBoundsViscosity={1.0}
        zoomSnap={0.1}
        zoomDelta={0.5}
        minZoom={-4}
        attributionControl={false}
      >
        <FitBounds />
        <ImageOverlay
          url="/images/snakefat_map.png"
          bounds={IMAGE_BOUNDS}
        />
        <MapMarkers onShow={showCard} onHide={hideCard} />
      </MapContainer>

      {hoveredLocation && (
        <HoverCard
          location={hoveredLocation}
          x={cardPosition.x}
          y={cardPosition.y}
        />
      )}
    </div>
  );
}
