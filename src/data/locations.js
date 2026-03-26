/**
 * Single source of truth: all map data lives in snakefat.json.
 *
 * `position` values are Leaflet CRS.Simple coordinates:
 *   lat = imageHeight - tipPixelY
 *   lng = tipPixelX
 *
 * The tip is the bottom-centre point of the baked-in marker icon.
 * To move a marker, update its `position` array in snakefat.json.
 */
import mapData from './json/snakefat.json';

export const IMAGE_WIDTH  = mapData.imageWidth;   // 3508
export const IMAGE_HEIGHT = mapData.imageHeight;  // 2480
export const locations    = mapData.locations;
