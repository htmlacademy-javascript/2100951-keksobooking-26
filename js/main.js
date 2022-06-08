function getRandomIntInclusive(from, to) {
  if (from >= 0 && to >= 0 && from <= to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  return null;
}

getRandomIntInclusive(9.8, 42.3);


function getRandomIntInclusive2(from, to, digits) {
  if (from >= 0 && to >= 0 && from <= to && digits >= 0) {
    return (Math.random() * (to - from + 1) + from).toFixed(digits);
  }

  return null;
}

getRandomIntInclusive2(9.8, 42.3, 3);

