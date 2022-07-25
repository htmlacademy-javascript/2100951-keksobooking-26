const getAddress = 'https://26.javascript.pages.academy/keksobooking/data';
const saveAddress =  'https://26.javascript.pages.academy/keksobooking';

export const getAds = (onSuccess, onFail) => {
  fetch(getAddress)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail();
    });
};

export const saveAd = (onSuccess, onFail, body) => {
  fetch(
    saveAddress,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

