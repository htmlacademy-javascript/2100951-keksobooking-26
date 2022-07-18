export const getRandomInt = (from, to) => {
  if (from >= 0 && to >= 0 && from <= to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  return null;
};

export const getRandomFloat = (from, to, digits) => {
  if (from >= 0 && to >= 0 && from <= to && digits >= 0) {
    return (Math.random() * (to - from + 1) + from).toFixed(digits);
  }

  return null;
};

export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const ALERT_SHOW_TIME = 5000;

export const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '999';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showAlertErrorGet = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '999';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

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

const isEscapeKey = (evt) => evt.key === 'Escape';
const showAlertSuccessSend = () => {
  document.body.append(messageSuccessTemplate);

  messageSuccessTemplate.addEventListener('click', ()=>{
    messageSuccessTemplate.remove();
  });

  document.addEventListener('keydown', (evt)=>{
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageSuccessTemplate.remove();
    }
  });
};

const showAlertErrorSend = () => {
  document.body.append(messageErrorTemplate);

  messageErrorTemplate.addEventListener('click', ()=>{
    messageErrorTemplate.remove();
  });

  closeErrorAlertButton.addEventListener('click', ()=>{
    messageErrorTemplate.remove();
  });

  document.addEventListener('keydown', (evt)=>{
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageErrorTemplate.remove();
    }
  });
};

export {isEscapeKey, showAlertErrorGet, showAlertSuccessSend, showAlertErrorSend};
