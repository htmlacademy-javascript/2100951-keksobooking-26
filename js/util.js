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

