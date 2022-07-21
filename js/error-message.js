const ALERT_SHOW_TIME = 5000;

const showAlertError = () => {
 const alertContainer = document.createElement('div');
 document.body.append(alertContainer);

 setTimeout(() => {
   alertContainer.remove();
 }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
 let timeoutId;

 return (...rest) => {

   clearTimeout(timeoutId);

   timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
 };
}

const messageSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const messageErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeErrorAlertButton = messageErrorTemplate.querySelector('.error__button');

const showSuccesDialog = () => {
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

const showAlertDialog = () => {
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

export {showAlertError, showSuccesDialog, showAlertDialog};