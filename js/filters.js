import { getLocalAds, MAX_ADS_COUNT } from './ads.js';
import { renderPins } from './map.js';
import { debounce } from './utils.js';

const PriceValue = {
  MIDDLE: 10000,
  HIGH: 50000
};
const RERENDER_DELAY = 500;

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const filterByType = (ad) => housingType.value === 'any' || ad.offer.type === housingType.value;

const filterByPrice = (ad) => {
  if (housingPrice.value === 'any') {
    return true;
  }
  if (housingPrice.value === 'low') {
    return ad.offer.price < PriceValue.MIDDLE;
  }
  if (housingPrice.value === 'middle') {
    return (ad.offer.price < PriceValue.HIGH && ad.offer.price >= PriceValue.MIDDLE);
  }
  if (housingPrice.value === 'high') {
    return ad.offer.price >= PriceValue.HIGH;
  }

  return true;
};

const filterByRooms = (ad) => housingRooms.value === 'any' || ad.offer.rooms === +housingRooms.value;

const filterByGuests = (ad) => housingGuests.value === 'any' || ad.offer.guests === +housingGuests.value;

const filterByFeatures = (ad) => {
  const checkedFeatures = Array.from(housingFeatures.querySelectorAll('input[name="features"]:checked'));
  const dataFeatures = ad.offer.features;
  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
  return false;
};

const filterAds = (ads) => {
  const filteredAds = [];

  for (const ad of ads) {
    if (
      [filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures].every((call) => call(ad))
    ) {
      filteredAds.push(ad);
    }

    if (filteredAds.length === MAX_ADS_COUNT) {
      break;
    }
  }

  return filteredAds;
};

const filterPins = () => {
  const ads = getLocalAds();
  const filteredAds = filterAds(ads);

  renderPins(filteredAds);
};

const onFilterChange = debounce(filterPins, RERENDER_DELAY);
mapFilters.addEventListener('change', onFilterChange);

export const filterReset = () => mapFilters.reset();
