import { saveAd } from './api.js';
import { showAlertDialog, showSuccesDialog } from './error-message.js';
import { resetMap } from './map.js';
import { onFilterReset } from './filters.js';

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

const disableForm = () => {
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

const activateForm = () => {
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

const resetForm = () => {
  form.reset();
  onFilterReset();
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', resetForm);

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

  blockSubmitButton();

  saveAd(() => {
    showSuccesDialog();
    form.reset();
    resetMap();
    unblockSubmitButton();
  },
  () => {
    showAlertDialog();
    unblockSubmitButton();
  },
  new FormData(evt.target),
  );
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { disableForm, activateForm };
