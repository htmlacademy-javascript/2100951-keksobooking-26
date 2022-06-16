const AUTHOR = {
  avatar: function () {
    const listAvatars = [];

    for (let i = 1; i <= 10; i++) {
      if (i < 10) {
        i = i.padStart(1, '0');
      }
      const avatars = 'img/avatars/user' + i + '.png';
      listAvatars.push(avatars);
    }
    return listAvatars;
  }
};


const OFFER = {
  title: 'Заголовок',
  address: 'location[lat]' + 'location[lng]',
  price: getRandomIntFloat(),
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  rooms: getRandomInt(),
  guests: getRandomInt(),
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],

  features: function () {
    const getFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    for (let i = 1; i < getFeatures.length; i++) {
      getFeatures[i] += getRandomInt(0, 10);
    }
    return getFeatures;
  },
  description: 'Описание помещения',
  photos: function () {
    const getPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
    for (let i = 1; i < getPhotos.length; i++) {
      getPhotos[i] += getRandomInt();
    }
    return getPhotos;
  }
};

let location =
  {
    lat: getRandomIntFloat(35.65000, 35.70000, 5),
    lng: getRandomIntFloat(139.70000, 139.80000, 5)
  };

function getRandomInt(from, to) {
  if (from >= 0 && to >= 0 && from <= to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  return null;
}


function getRandomIntFloat(from, to, digits) {
  if (from >= 0 && to >= 0 && from <= to && digits >= 0) {
    return (Math.random() * (to - from + 1) + from).toFixed(digits);
  }

  return null;
}


const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};


const createAd = () => {
  return {
    author: AUTHOR.avatar,
    offer: OFFER.title + OFFER.address.location + OFFER.price + getRandomArrayElement(OFFER.type)
      + OFFER.rooms + OFFER.guests + getRandomArrayElement(OFFER.checkin)
      + getRandomArrayElement(OFFER.checkout) + OFFER.features + OFFER.photos(),
    location: location.lat + location.lng,
  };
};

const ad = Array.from({length: 10}, createAd);
