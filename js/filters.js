import { getLocalAds, MAX_ADS_COUNT } from './ads.js';
import { renderPins } from './map.js';
import { debounce } from './utils.js';

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

const filterByType = (ad) => housingType.value === 'any' || ad.offer.type === housingType.value;

const filterByPrice = (ad) => {
  switch (housingPrice.value) {
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

const filterByRooms = (ad) => housingRooms.value === 'any' || ad.offer.rooms === +housingRooms.value;

const filterByGuests = (ad) => housingGuests.value === 'any' || ad.offer.guests === +housingGuests.value;

const filterByFeatures = (ad) => {
  const checkedFeatures = Array.from(housingFeatures.querySelectorAll('input[type="checkbox"]:checked'));
  const dataFeatures = ad.offer.features;

  if (dataFeatures) {
    return checkedFeatures.every((feature) => dataFeatures.includes(feature.value));
  }
};

const filterAds = (ads) => {
  const filteredAds = [];

  for (const ad of ads) {
    if (
      filterByType(ad) &&
            filterByPrice(ad) &&
            filterByRooms(ad) &&
            filterByGuests(ad) &&
            filterByFeatures(ad)
    ) {
      filteredAds.push(ad);
    }

    if (filteredAds.length === MAX_ADS_COUNT) {
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

export const filterReset = () => mapFilters.reset();
