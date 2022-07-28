const WIDTH = 40;
const HEIGHT = 45;
const ALT = 'Фотография жилья';

const typeTranslate = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const templateCard = document.querySelector('#card').content;
const popupElement = templateCard.querySelector('.popup');

export const createPopup = (ad) => {
  const element = popupElement.cloneNode(true);
  const featuresContainer = element.querySelector('.popup__features');

  if (ad.offer.features) {
    for (const feature of ad.offer.features) {
      const li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${feature}`);
      li.textContent = feature;
      featuresContainer.append(li);
    }
  }

  if (ad.offer.photos) {
    const photosContainer = element.querySelector('.popup__photos');

    for (const photo of ad.offer.photos) {
      const img = document.createElement('img');
      img.src = photo;
      img.classList.add('popup__photo');
      img.width = WIDTH;
      img.height = HEIGHT;
      img.alt = ALT;

      photosContainer.append(img);
    }
  }

  element.querySelector('.popup__title').textContent = ad.offer.title;
  element.querySelector('.popup__text--address').textContent = ad.offer.address;
  element.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  element.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  element.querySelector('.popup__description').textContent = ad.offer.description || '';
  element.querySelector('.popup__type').textContent = typeTranslate[ad.offer.type];
  element.querySelector('.popup__avatar').src = ad.author.avatar ? ad.author.avatar : element.querySelector('.popup__avatar').style.display = 'none';

  return element;
};
