export const $ = selector => {
  let element = document.querySelectorAll(selector);
  return element.length === 1 ? element[0] : Array.from(element);
}
export const _$ = document.querySelectorAll.bind(document);

export const parseReqUrl = () => {
  const url = window.location.hash.toLowerCase();
  const req = url.split('/');
  return {
    hash_one: req[1],
    hash_two: req[2] ? req[2] : '',
    hash_three: req[3] ? (isNaN(+req[3]) ? req[3] : '') : '',
    id: isNaN(+req[2]) ? (isNaN(+req[3]) ? (req[4] ? req[4] : '') : req[3]) : req[2]
  }
}

export const toBase64 = (array) => {
  return btoa(
    array.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}