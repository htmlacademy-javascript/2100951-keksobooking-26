const MIN = 0;
const MAX = 100000;
const CAPACITY_OPTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const MIN_PRICE_OF_HOUSE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};
const PRICE_ERROR_MESSAGE = 'Указанная сумма меньше минимальной';

const form = document.querySelector('.ad-form');

export const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const typeElement = form.querySelector('#type');
export const priceElement = form.querySelector('#price');
export const sliderElement = form.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: MIN,
    max: MAX,
  },
  start: MIN,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set([priceElement.value, null]);
});

export const defaultPrice = () => {
  sliderElement.noUiSlider.set(MIN);
  priceElement.placeholder = MIN_PRICE_OF_HOUSE[typeElement.value];
  priceElement.min = MIN_PRICE_OF_HOUSE[typeElement.value];
};

typeElement.addEventListener('change', () => {
  defaultPrice();
});

defaultPrice();

const validatePrice = () => parseInt(priceElement.getAttribute('min'), 10) <= priceElement.value;

const price = form.querySelector('#price');

pristine.addValidator(
  price,
  validatePrice,
  PRICE_ERROR_MESSAGE
);

const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');
const capacityOptionList = guestNumber.children;

const isCorrectCapacity = (capacityValue) => CAPACITY_OPTIONS[roomNumber.value].some((value) => capacityValue === value);

const selectCapacityOption = () => {
  for (let i = 0; i < capacityOptionList.length; i++) {
    const capacityOption = capacityOptionList[i];

    if (isCorrectCapacity(capacityOption.value)) {
      capacityOption.removeAttribute('disabled');
    } else {
      capacityOption.setAttribute('disabled', '');
    }
  }
};

selectCapacityOption();

roomNumber.addEventListener('input', () => {
  selectCapacityOption();
  pristine.validate(guestNumber);
});

const getGuestsErrorMessage = () => {
  switch (roomNumber.value) {
    case '3':
      return 'для 1 гостя, для 2 гостей или для 3 гостей';
    case '2':
      return 'для 1 гостя или для 2 гостей';
    case '1':
      return 'для 1 гостя';
    case '100':
      return 'не для гостей';
  }
};

pristine.addValidator(guestNumber, isCorrectCapacity, getGuestsErrorMessage);

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});


