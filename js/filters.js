import { removeMapPin, renderPins } from "./map.js";
const ADS_COUNT = 10;
const PriceValue = {
  MIDDLE: 10000,
  HIGH: 50000
};

const mapFilters = document.querySelector('.map__filters');
const filterSelects = mapFilters.querySelectorAll('select');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const filterCheckboxes = housingFeatures.querySelectorAll('input');

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

const filterAds = (data) => {
  const selectedType = housingType.value;
  const selectedPrice = housingPrice.value;
  const selectedRooms = housingRooms.value;
  const selectedGuests = housingGuests.value;
  const checkedFeatures = Array.from(housingFeatures.querySelectorAll('input[type="checkbox"]:checked'));

  const filteredAds = [];

  for (const ad of data) {
    if (filteredAds.length >= ADS_COUNT) {
      break;
    }

    if (
      fiterByType(ad, selectedType) &&
      filterByPrice(ad, selectedPrice) &&
      filterByRooms(ad, selectedRooms) &&
      filterByGuests(ad, selectedGuests) &&
      filterByFeatures(ad, checkedFeatures)
    ) {
      filteredAds.push(ad);
    }
  }

  return filteredAds;
};

const onFilterChange = (ads) => {
    removeMapPin();
    renderPins(filterAds(ads));
  };
  
export const setFilterListener = (data) => {
    mapFilters.addEventListener('change', debounce(() => onFilterChange(data)));
  };
  
export const onFilterReset = () => {
    filterSelects.forEach((filterSelect) => {
        filterSelect.value = 'any';
      });
    
      filterCheckboxes.forEach((filterCheckbox) => {
        filterCheckbox.checked = false;
      });
    
      renderPins();
  };
