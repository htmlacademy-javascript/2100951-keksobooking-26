import {activateForm, setAddress} from './forms.js';
import {createPopup} from './ad-popup.js';
import { getAds } from './api.js';
import { showAlertError } from './error-message.js';

const TOKYO = { lat: 35.65283, lng: 139.83948 };
const MAP_ZOOM = 10;

const onMapLoaded = () => {
getAds((ads) => {
  activateForm;
  renderPins(ads);
  setAdFormForSubmit;
},
() => showAlertError());
};

const map = L.map('map-canvas')
.on('load', onMapLoaded)
.setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },MAP_ZOOM
);

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
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    autoPan: true,
    icon: mainPinIcon,
  },
  );
 markerCenter.addTo(map);

 markerCenter.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng())
 });

 export const renderPins = (ads) => {
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

  export const resetMap = () => {
    markerCenter.setLatLng({
      lat: TOKYO.lat,
      lng: TOKYO.lng,
    });
  
    map.setView({
      lat: TOKYO.lat,
      lng: TOKYO.lng,
    }, MAP_ZOOM);
  };

  const resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetMap);
  
