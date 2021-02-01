import { teddyBears } from './constants';

/**
 * With displacement effect, add scrolling feature on the page to go to the concerned product.
 * @param {string} productId - The anchor where to scroll the page to
 */
const scrollToProduct = (productId) => {
  location.hash = '#' + productId;
}

/**
 * Defines a messageBox to display an alert.
 * @param {string} msgType  - A string defining the color of the box. Can be either: success, danger, warning, info, primary, secondary, light or dark.
 * @param {string} title - A string displayed in bold style on first line
 * @param {string} message A description message for the messageBox
 */
export const basketAlertMsg = (msgType, title, message) => {
  const alertMsg = document.createElement('div');
  alertMsg.classList.add('alert','alert-' + msgType,'alert-dismissible','fade','show','basket-msg');
  alertMsg.setAttribute('role','alert');
  alertMsg.innerHTML = '<strong>' + title + '</strong>' + ' ' + message +
  '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
  document.getElementsByTagName('body')[0].appendChild(alertMsg);
}

/**
 * Indicates the single price of a product, by ID, if exists or 0 instead.
 * @param {string} productId 
 * @returns {integer} price of the product
 */
export const getPriceFromId = (productId) => {
  let teddyId = teddyBears.findIndex(function(teddy) {
    if (teddy.id === productId) return true;
  });
  if (teddyId >= 0) {
    return teddyBears[teddyId].price;
  } else return 0;
}

/**
 * Formats price in cents to price in euros with monetary symbol.
 * @param {integer} price 
 * @returns {string} formatted price
 */
export const formatPrice = (price) => {
  return (parseFloat(price) / 100).toFixed(2) + '€';
}

/**
 * Retrieves the product ID contained in page address.
 * @returns {string} the ID of the product 
 */
export const getUrlParamsProductId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return [urlParams.get('productId'), urlParams];
}

/**
 * Retrieves user data contained in the page address.
 * @returns {object} user information
 */
export const getUrlParamsUser = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const user = {
    firstName: urlParams.get('first-name'),
    lastName: urlParams.get('last-name'),
    address: urlParams.get('address'),
    city: urlParams.get('city'),
    email: urlParams.get('email')
  }
  return user;
}

/**
 * Checks if a product detail was displayed, and if so, scrolls to this product on home page.
 */
export const needToScroll = () => {
  const productId = getUrlParamsProductId()[0];
  const urlParams = getUrlParamsProductId()[1];
  if (productId !== null) {
    urlParams.delete('productId');
    window.history.replaceState(null, null, window.location.pathname);
    scrollToProduct(productId);
  }
}