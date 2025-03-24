import L from 'leaflet/dist/leaflet.js';
import { isMobile } from './functions.js';

function addLileLayer(map) {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

const mapMarker = L.icon({
  iconUrl: './img/marker.png',
  iconSize: [24, 40],
  iconAnchor: [12, 40],
});

// === location-map ==================================================================
const locationMap = new L.Map('location-map', {
  center: [51.067936, 71.42287],
  zoom: 13,
  dragging: !isMobile.any(),
});

L.marker([51.06116, 71.43724], { icon: mapMarker }).addTo(locationMap);
addLileLayer(locationMap);

locationMap.addEventListener('click', (e) => {
  window.open(
    'https://www.openstreetmap.org/?mlat=51.06116&mlon=71.43724#map=13/51.067936/71.42287',
  );
});

// === contacts-map ==================================================================
const contactsMap = new L.Map('contacts-map', {
  center: [51.12974, 71.42203],
  zoom: 16,
  dragging: !isMobile.any(),
});

L.marker([51.13057, 71.42255], { icon: mapMarker }).addTo(contactsMap);
addLileLayer(contactsMap);

contactsMap.addEventListener('click', (e) => {
  window.open(
    'https://www.openstreetmap.org/?mlat=51.13057&mlon=71.42255#map=16/51.12974/71.42203',
  );
});
