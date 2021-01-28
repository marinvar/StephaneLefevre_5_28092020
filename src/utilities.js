import { teddyBears } from './constants';

/**
 * With displacement effect, scrolls the page to the concerned product by ID
 * @param {string} productId - The anchor where to scroll the page to
 */
const scrollToProduct = (productId) => {
  location.hash = '#' + productId;
}

/**
 * Defines a messageBox to display an alert
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

export const getPriceFromId = (productId) => {
  let teddyId = teddyBears.findIndex(function(teddy) {
    if (teddy.id === productId) return true;
  });
  if (teddyId >= 0) {
    return teddyBears[teddyId].price;
  } else return 0;
}

/**
 * Formats price in cents to price in euros with monetary symbol
 * @param {integer} price 
 */
export const formatPrice = (price) => {
  return (parseFloat(price) / 100).toFixed(2) + '€';
}

export const getUrlParamsProductId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return [urlParams.get('productId'), urlParams];
}

/**
 * Retrieves basket content from localStorage and updates in 'basketContent' array
 */
export const getBasketFromStorage = () => {
  let storageCart_json = localStorage.getItem("teddiesCart");
  if (localStorage.getItem("teddiesCart") !== null) {
    basketContent = JSON.parse(storageCart_json);
  }
}

/**
 * Stores basket content to localStorage
 */
export const storeBasketToStorage = () => {
  let storageCart_json = JSON.stringify(basketContent);
  localStorage.setItem("teddiesCart", storageCart_json);
}

/**
 * Checks if a product detail was displayed, and if so, scrolls to this product on home page
 */
export const needToScroll = () => {
  const productId = getUrlParamsProductId()[0];
  const urlParams = getUrlParamsProductId()[1];
  urlParams.delete('productId');
  if (productId !== null) {
    window.history.replaceState(null, null, window.location.pathname);
    scrollToProduct(productId);
  }
}