import {createAds, MAX_ADS} from './main.js';

const map = document.querySelector('#map-canvas');

const typeTranslate = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const templateCard = document.querySelector('#card').content;
const popupElement = templateCard.querySelector('.popup');
const adCards = createAds(MAX_ADS);

const createPopup = (ad) => {
  const element = popupElement.cloneNode(true);

  const featuresContainer = element.querySelector('.popup__features');

  for (const anyFeature of createAds.features) {
    const li = document.createElement('li');
    li.className = `popup__feature--${anyFeature}`;
    li.textContent = anyFeature;

    featuresContainer.append(li);
  }

  const photosContainer = element.querySelector('.popup__photos');

  for (const photo of createAds.photos) {
    const img = document.createElement('img');
    img.src = photo;
    img.classList.add('popup__photo');
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';

    photosContainer.append(img);
  }

  element.querySelector('.popup__title').textContent = ad.offer.title;
  element.querySelector('.popup__text--address').textContent = ad.offer.address;
  element.querySelector('.popup__text--price').textContent = `${ad.offer.price}<span>₽/ночь</span>`;
  element.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  element.querySelector('.popup__description').textContent = ad.offer.description || '';
  element.querySelector('.popup__type').textContent = typeTranslate[ad.offer.type];
  element.querySelector('.popup__avatar').src = ad.author.avatar ? ad.author.avatar : element.querySelector('.popup__avatar').style.display = 'none';

  return element;
};

const offer = createPopup(adCards[0]);
map.appendChild(offer);
