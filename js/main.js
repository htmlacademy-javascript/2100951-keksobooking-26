function getRandomIntInclusive(from, to, amount) {
  if (from >= 0 && to >= 0 && from <= to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  else {
    return null
  }
}
console.log(getRandomIntInclusive(0, 23))
