const secretPassword =
  'dda3c12e3753de5f485fec138fe44b79bcbc5c2565cf991cb5b83800cd6713a84d472d16ba9fa7040abe2573015f1c990a0f508f1a048fbe635ed686d8f71825';

const checkPassword = password => {
  const hashObj = new jsSHA('SHA-512', 'TEXT', { numRounds: 64 });

  hashObj.update(password);

  return hashObj.getHash('HEX') === secretPassword;
};

const checkDateInputFormat = date => {
  var ISO_8601_FULL = /^\d{4}-\d\d-\d\dZ$/i;

  return ISO_8601_FULL.test(date);
};

export { checkPassword, checkDateInputFormat };
