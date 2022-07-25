import { getLocalAds, MAX_ADS_COUNT } from "./ads.js";
import { renderPins } from "./map.js";
import { debounce } from "./utils.js";

const PriceValue = {
  MIDDLE: 10000,
  HIGH: 50000
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const fiterByType = (ad, type) => type === 'any' || ad.offer.type === type;

const filterByPrice = (ad, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return ad.offer.price < PriceValue.MIDDLE;
    case 'middle':
      return (ad.offer.price < PriceValue.HIGH && ad.offer.price >= PriceValue.MIDDLE);
    case 'high':
      return ad.offer.price >= PriceValue.HIGH;
    default:
      return true;
  }
};

const filterByRooms = (ad, rooms) => rooms === 'any' || ad.offer.rooms === +rooms;

const filterByGuests = (ad, guests) => guests === 'any' || ad.offer.guests === +guests;

const filterByFeatures = (ad, features) => {
  const dataFeatures = ad.offer.features;
  if (dataFeatures) {
    return features.every((feature) => dataFeatures.includes(feature.value));
  }
};

const filterAds = (ads) => {
  const selectedType = housingType.value;
  const selectedPrice = housingPrice.value;
  const selectedRooms = housingRooms.value;
  const selectedGuests = housingGuests.value;
  const checkedFeatures = Array.from(housingFeatures.querySelectorAll('input[type="checkbox"]:checked'));

  const filteredAds = [];

  for (const ad of ads) {

    if (
      fiterByType(ad, selectedType) &&
      filterByPrice(ad, selectedPrice) &&
      filterByRooms(ad, selectedRooms) &&
      filterByGuests(ad, selectedGuests) &&
      filterByFeatures(ad, checkedFeatures)
    ) {
      filteredAds.push(ad);
    }
    if (filteredAds.length >= MAX_ADS_COUNT) {
      break;
    }
  }

  return filteredAds;
};

const onFilterChange = () => {
    const ads = getLocalAds();
    const filteredAds = filterAds(ads);
    renderPins(filteredAds);
  };
  
  mapFilters.addEventListener('change', debounce(() => onFilterChange()));
  
export const onFilterReset = () => {
  mapFilters.reset();
  };
