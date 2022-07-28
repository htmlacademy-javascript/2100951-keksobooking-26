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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    saveAd(() => {
      showSuccessDialog();
      resetForm();
      onMapReset();
      unblockSubmitButton();
    },
    () => {
      showAlertDialog();
      unblockSubmitButton();
    },
    new FormData(evt.target),
    );
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


