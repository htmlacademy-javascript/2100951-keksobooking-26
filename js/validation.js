import {sendData} from './api.js';
import {showAlertErrorSend, showAlertSuccessSend} from './utils.js';

const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
const MIN = 0;
const MAX = 100000;
const CAPACITY_OPTIONS= {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
}

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const address = form.querySelector('#address');
const houseTypeField = form.querySelector('#type');
const housePriceField = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');

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

sliderElement.noUiSlider.on('update', () => {
  housePriceField.value = sliderElement.noUiSlider.get();
});

housePriceField.addEventListener('change', () => {
  sliderElement.noUiSlider.set([housePriceField.value, null]);
});


const setPriceField = (value) => {
  housePriceField.placeholder = value;
  housePriceField.min = value;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: value,
      max: MAX,
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

const validatePrice = () => +housePriceField.getAttribute('min');
 const price = form.querySelector('#price');

pristine.addValidator(
  price,
  validatePrice,
  'Указанная сумма меньше минимальной'
);

const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');
const capacityOptionList = guestNumber.children;

const isCorrectCapacity = (capacityValue) => CAPACITY_OPTIONS[roomNumber.value].some(value => capacityValue === value);

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
    case '0':
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

const reset = () => {
  form.reset();
  address.value = `${latCenter.toFixed(5)}, ${lngCenter.toFixed(5)  }`;
  setPriceForHouseType();
};

resetButton.addEventListener('click',(evt)=>{
  evt.preventDefault();
  reset();
});

export const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(
        ()=>{showAlertSuccessSend();
          reset();},
          showAlertErrorSend,
        new FormData(evt.target),
      );

    }
  });};