const MAX_ADS = 10;

const PRICE = {
  min: 1000,
  max: 100000,
};

const ROOMS = {
  min: 1,
  max: 1000,
};

const GUESTS = {
  min: 1,
  max: 999
};

const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const PHOTO = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const LOCATION = {
  minLat: 35.65000,
  maxLat: 35.70000,
  minLng: 139.70000,
  maxLng: 139.80000,
  round: 5
}

const createAd = (id) => {
  const location = {
    lat: getRandomFloat(LOCATION.minLat, LOCATION.maxLat, LOCATION.round),
    lng: getRandomFloat(LOCATION.minLng, LOCATION.maxLng, LOCATION.round),
  };
  return {
    author: {
      avatar: `img/avatars/user${String(id).padStart(2, '0')}.png`
    },

    offer: {
      title: 'Заголовок',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInt(ROOMS.min, ROOMS.max),
      guests: getRandomInt(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: FEATURES.slice(0, getRandomInt(1, FEATURES.length)),
      description: 'Описание помещения',
      photos: PHOTO.slice(0, getRandomInt(1, PHOTO.length)),
    }
  };

};


getRandomInt = (from, to) => {
  if (from >= 0 && to >= 0 && from <= to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  return null;
}


getRandomFloat = (from, to, digits) => {
  if (from >= 0 && to >= 0 && from <= to && digits >= 0) {
    return (Math.random() * (to - from + 1) + from).toFixed(digits);
  }
  return null;
}


const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];


const createAds = (max) => Array.from({length: max},
  (_, index) => createAd(index + 1)
);

createAds(MAX_ADS);
console.log(createAds(10))
