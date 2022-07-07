const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const address = form.querySelector('#address');
const latCenter = 35.70000;
const lngCenter = 139.42500;

const houseTypeField = form.querySelector('#type');
const housePriceField = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
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

sliderElement.noUiSlider.on('update', () => {
  housePriceField.value = sliderElement.noUiSlider.get();
});

const setPriceField = (value) => {
  housePriceField.placeholder = value;
  housePriceField.min = value;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: value,
      max: 100000,
    },
    start: value,
  });
};

const setPriceForHouseType = () => {
  switch (houseTypeField.value) {
    case 'flat':
      setPriceField(1000);
      break;
    case 'bungalow':
      setPriceField(0);
      break;
    case 'house':
      setPriceField(5000);
      break;
    case 'palace':
      setPriceField(10000);
      break;
    case 'hotel':
      setPriceField(3000);
      break;
  }
};

window.addEventListener('load', () => {
  address.value = `${latCenter.toFixed(5)}, ${lngCenter.toFixed(5)}`;
  setPriceForHouseType();
});

houseTypeField.addEventListener('change', () => {
  setPriceForHouseType();
});

const validatePrice = () => parseInt(housePriceField.getAttribute('min'), 10) <= housePriceField.value;

pristine.addValidator(
  form.querySelector('#price'),
  validatePrice,
  'Указанная сумма меньше минимальной'
);

const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');

const validateGuestNumber = () => roomNumber.value >= guestNumber.value;

const getGuestsErrorMessage = () => {
  switch (roomNumber.value) {
    case '3':
      return 'для 1 гостя, для 2 гостей или для 3 гостей';
    case '2':
      return 'для 1 гостя или для 2 гостей';
    case '1':
      return 'для 1 гостя';
    case '0':
      return 'не для гостей';
  }
};

pristine.addValidator(guestNumber, validateGuestNumber, getGuestsErrorMessage);

const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
