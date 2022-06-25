import {createAds} from "./main.js";

const displayAreaElement = document.querySelector('#map-canvas');

const templateForm = document.querySelector('#card').content;
const template = templateForm.querySelector('.popup');
const form = document.createDocumentFragment();

const element = template.cloneNode(true);
const typeTranslate = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const featuresArray = createAds[0].offer.features;
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

const photosArray = createAds[0].offer.photos;
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

element.querySelector('.popup__title').innerHtml = createAds[0].offer.title.textContent;
element.querySelector('.popup__text--address').innerHtml = createAds[0].offer.address.textContent;
element.querySelector('.popup__text--price').innerHtml = createAds[0].offer.price.textContent ? `${createAds[0].offer.price.textContent  }<span>₽/ночь</span>` : '';
element.querySelector('.popup__text--capacity').innerHtml = createAds[0].offer.rooms && createAds[0].offer.guests
  ? `${createAds[0].offer.rooms.textContent} комнаты для ${createAds[0].offer.guests.textContent} гостей` : '';
element.querySelector('.popup__text--time').innerHtml = createAds[0].offer.checkin.textContent && createAds[0].offer.checkout.textContent
  ? `Заезд после ${createAds[0].offer.checkin.textContent}, выезд до ${createAds[0].offer.checkout.textContent}` : '';
element.querySelector('.popup__description').innerHtml = createAds[0].offer.description.textContent;
element.querySelector('.popup__type').innerHtml = typeTranslate[createAds[0].offer.type];
element.querySelector('img').src = createAds[0].author.avatar ? createAds[0].author.avatar : element.querySelector('img').style.display = 'none';


form.appendChild(element);
displayAreaElement.appendChild(form);
