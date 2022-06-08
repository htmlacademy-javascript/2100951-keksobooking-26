function getRandomInt(from, to) {
  if (from >= 0 && to >= 0 && from <= to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  return null;
}

getRandomInt(9.8, 42.3);


function getRandomIntFloat(from, to, digits) {
  if (from >= 0 && to >= 0 && from <= to && digits >= 0) {
    return (Math.random() * (to - from + 1) + from).toFixed(digits);
  }

  return null;
}

getRandomIntFloat(9.8, 42.3, 3);

