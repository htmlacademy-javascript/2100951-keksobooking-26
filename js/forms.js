import { sendData } from './api.js';
import {showAlertErrorSend, showAlertSuccessSend} from './utils.js';
import { resetMap } from './map.js';

const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('select');
const mapFormFieldset = mapForm.querySelector('fieldset');
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const address = document.querySelector('#address');

export const setAddress = () => {
  address.value = `${markerCoordinates.lat.toFixed(5)}, ${markerCoordinates.lng.toFixed(5)}`;
  }

const disablePage = () => {
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

disablePage();

const activatePage = () => {
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

activatePage();
const resetButton = formAd.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetMap);
  
  const submitButton = formAd.querySelector('.ad-form__submit');
  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Опубликовываем...';
  };

  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };
  
  blockSubmitButton();
    const formData = new FormData(evt.target);

    sendData(() => {
      showAlertSuccessSend();
      formAd.reset();
      resetMap();
      unblockSubmitButton();
    },
    () => {
      showAlertErrorSend();
      unblockSubmitButton();
    }, formData); 
    
export {disablePage, activatePage};
