const GET_ADS = 'https://26.javascript.pages.academy/keksobooking/data';
const SAVE_AD = 'https://26.javascript.pages.academy/keksobooking';

export const getAds = (onSuccess, onFail) => {
  fetch(GET_ADS)
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
    SAVE_AD,
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

