import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './index.css';
import FantasyMap from './components/FantasyMap';
import DetailPage from './components/DetailPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<FantasyMap />} />
        <Route path="/location/:id" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
