import {activatePage} from './conditions.js';
import {popup} from './ad-popup.js';

const TOKYO = { lat: 35.65283, lng: 139.83948 };
const MAP_ZOOM = 10;
const NUMBER_OF_AD = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },MAP_ZOOM);

const layerGroup = L.layerGroup().addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createMainPin = () => {
    const mainPinIcon = L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });
}
    const createPinsOnMap = (ads, createFromTemplate) => {
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
  return markerCenter;
};

const markers = (marker) => {
    const address = document.querySelector('#address');
    const markerCoordinates = marker.getLatLng();
  
    address.value = `${markerCoordinates.lat.toFixed(5)}, ${markerCoordinates.lng.toFixed(5)}`;
  
    marker.on('moveend', (evt) => {
      const coordinates = evt.target.getLatLng();
      address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
    });
  };

 const createPinMarker = (ad) => {

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
      .bindPopup(createFromTemplate(ad));

    return pinMarker;
  };

  ads.forEach((ad) => {
    createPinMarker(ad);
  });

export const makeInteractiveMap = (ads) => {
    map();
  
    const marker =  createMainPin();
    markers(marker);
  
    createPinsOnMap(ads.slice(0, NUMBER_OF_AD), popup);
  };

