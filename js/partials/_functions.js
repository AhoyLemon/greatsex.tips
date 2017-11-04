function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function randomFrom(array) {
  return array[Math.floor(Math.random()*(array.length))];
}