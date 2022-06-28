import {createAds} from './main.js';

const displayAreaElement = document.querySelector('#map-canvas');

const templateForm = document.querySelector('#card').content;
const template = templateForm.querySelector('.popup');
const form = document.createDocumentFragment();
const createAd = createAds ();

const createOffers = (createAd) => {
  const element = template.cloneNode(true);

  const typeTranslate = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const featuresArray = createAd.offer.features;
  const featuresContainerElement = element.querySelector('.popup__features');
  const featuresListElement = featuresContainerElement.querySelectorAll('.popup__feature');

  if (featuresArray) {
    const modifiers = featuresArray.map((anyFeature) => `popup__feature--${anyFeature}`);
    featuresListElement.forEach((feature) => {
      const modifier = feature.classList[0];

      if (!modifiers.includes(modifier)) {
        feature.remove();
      }
    });
  } else {
    featuresContainerElement.innerHTML = '';
  }

  const photosArray = createAd.offer.photos;
  const photosContainerElement = element.querySelector('.popup__photos');
  const photoElement = element.querySelector('.popup__photo');
  photosContainerElement.innerHTML = '';

  if (photosArray) {
    photosArray.forEach((photo) => {
      const clonedPhotoElement = photoElement.cloneNode(true);
      photosContainerElement.insertAdjacentElement('beforeend', clonedPhotoElement);
      clonedPhotoElement.src = photo;
    });
  }

  element.querySelector('.popup__title').textContent = createAd.offer.title || '';
  element.querySelector('.popup__text--address').textContent = createAd.offer.address || '';
  element.querySelector('.popup__text--price').textContent = createAd.offer.price ? `${createAd.offer.price}<span>₽/ночь</span>` : '';
  element.querySelector('.popup__text--capacity').textContent = createAd.offer.rooms && createAd.offer.guests
    ? `${createAd.offer.rooms} комнаты для ${createAd.offer.guests} гостей` : '';
  element.querySelector('.popup__text--time').textContent = createAd.offer.checkin && createAd.offer.checkout
    ? `Заезд после ${createAd.offer.checkin}, выезд до ${createAd.offer.checkout}` : '';
  element.querySelector('.popup__description').textContent = createAd.offer.description || '';
  element.querySelector('.popup__type').textContent = typeTranslate[createAd.offer.type];
  element.querySelector('.popup__avatar').src = createAd.author.avatar ? createAd.author.avatar : element.querySelector('.popup__avatar').style.display = 'none';

  return element;
};

const generateOffers = createOffers(createAd[0]);
form.appendChild(generateOffers);
displayAreaElement.appendChild(form);
