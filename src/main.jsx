import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './index.css';
import FantasyMap from './components/FantasyMap';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FantasyMap />
  </React.StrictMode>
);
