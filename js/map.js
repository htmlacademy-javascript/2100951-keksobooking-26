import { activateForm, resetForm, setAddress } from './forms.js';
import { createPopup } from './ad-popup.js';
import { getAds } from './api.js';
import { showAlertError } from './error-message.js';
import { getMaxAds, saveAds } from './ads.js';

const Tokyo = { lat: 35.65283, lng: 139.83948 };
const MAP_ZOOM = 10;

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const layerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [25, 50],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerCenter = L.marker(
  {
    lat: Tokyo.lat,
    lng: Tokyo.lng,
  },
  {
    draggable: true,
    autoPan: true,
    icon: mainPinIcon,
  },
);
markerCenter.addTo(map);

markerCenter.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

export const removeMapPin = () => {
  layerGroup.clearLayers();
};

export const renderPins = (ads) => {
  removeMapPin();

  ads.forEach((ad) => {
    const pinMarker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        pinIcon
      },
    );

    pinMarker
      .addTo(layerGroup)
      .bindPopup(createPopup(ad));
  });
};

export const onMapReset = () => {
  markerCenter.setLatLng({
    lat: Tokyo.lat,
    lng: Tokyo.lng,
  });

  map.setView({
    lat: Tokyo.lat,
    lng: Tokyo.lng,
  }, MAP_ZOOM);

  renderPins(getMaxAds());
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', onMapReset);

const onMapLoaded = () => {
  getAds((ads) => {
    resetForm();
    activateForm();
    saveAds(ads);
    renderPins(getMaxAds());
  }, showAlertError);
};

map.on('load', onMapLoaded)
  .setView({
    lat: Tokyo.lat,
    lng: Tokyo.lng,
  }, MAP_ZOOM);
