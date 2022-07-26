export const MAX_ADS_COUNT = 10;

let ads = [];
export const saveAds = (data) => {
    ads = data;
};

export const getMaxAds = () => ads.slice(0, MAX_ADS_COUNT);

export const getLocalAds = () => ads;