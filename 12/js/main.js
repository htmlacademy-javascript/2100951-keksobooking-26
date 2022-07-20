import './ad.js';
import './utils.js';
import './ad-popup.js';
import './validation.js';
import './map.js'
import {getData} from './api.js';
import {showAlertErrorGet} from './util.js';
import {setUserFormSubmit} from './form-validation.js';


getData(setOffersPin, showAlertErrorGet);
setUserFormSubmit();