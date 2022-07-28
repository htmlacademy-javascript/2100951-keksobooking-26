import { saveAd } from './api.js';
import { showAlertDialog, showSuccessDialog } from './error-message.js';
import { onMapReset } from './map.js';
import { filterReset } from './filters.js';
import { pristine, setPrice } from './validations.js';
import { resetAvatar, resetPhoto, } from './photos.js';

const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldset = mapForm.querySelector('fieldset');
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const address = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const UNBLOCKBUTTON = 'Опубликовать';
const BLOCKBUTTON = 'Опубликовываю';

export const setAddress = (coordinates) => {
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

export const disableForm = () => {
  mapForm.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');

  mapFormSelects.forEach((element) => {
    element.disabled = true;
  });

  mapFormFieldset.disabled = true;
  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

disableForm();

export const activateForm = () => {
  mapForm.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  mapFormSelects.forEach((element) => {
    element.disabled = false;
  });

  mapFormFieldset.disabled = false;

  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

export const resetForm = () => {
  form.reset();
  filterReset();
  pristine.reset();
  setPrice();
  resetAvatar();
  resetPhoto();
};

const resetButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');

const switchSubmitBtnState = (value) => {
  submitButton.disabled = value;
  submitButton.textContent = UNBLOCKBUTTON;
  if (value === true) {
    submitButton.textContent = BLOCKBUTTON;
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    switchSubmitBtnState(true);
    saveAd(() => {
      showSuccessDialog();
      resetForm();
      onMapReset();
      switchSubmitBtnState(false);
    },
    () => {
      showAlertDialog();
      switchSubmitBtnState(false);
    },
    new FormData(evt.target),
    );
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


