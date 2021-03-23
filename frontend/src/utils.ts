export const $ = (selector) => {
  let element = document.querySelectorAll(selector);
  return element.length == 1 ? element[0] : element;
}