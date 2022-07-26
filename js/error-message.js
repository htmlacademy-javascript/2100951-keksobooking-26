import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

const showAlertError = () => {
  const alertContainer = document.createElement('div');
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const messageSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const messageErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeErrorAlertButton = messageErrorTemplate.querySelector('.error__button');

const showSuccessDialog = () => {
  document.body.append(messageSuccessTemplate);

  messageSuccessTemplate.addEventListener('click', () => {
    removeSuccessDialog();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeSuccessDialog();
    }
  });

  function removeSuccessDialog() {
    messageSuccessTemplate.remove();
    // eslint-disable-next-line no-undef
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showAlertDialog = () => {
  document.body.append(messageErrorTemplate);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeAlertDialog();
    }
  };

  messageErrorTemplate.addEventListener('click', () => {
    removeAlertDialog();
  });

  closeErrorAlertButton.addEventListener('click', () => {
    removeAlertDialog();
  });

  document.addEventListener('keydown', onDocumentKeydown);

  function removeAlertDialog() {
    messageErrorTemplate.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

export { showAlertError, showSuccessDialog, showAlertDialog };
