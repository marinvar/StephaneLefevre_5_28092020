import { getBasketFromStorage, storeBasketToStorage, 
  basketAlertMsg, getPriceFromId } from './utilities.js';
import { basketContent, teddiesBasket } from './constants';
import {  generateTotalAmount } from './basket';

/**
 * Get basket from localStorage, adds the product to the basket,
 * stores basket in localStorage and notifies user when done
 * @param {string} productId 
 */
const addToCart = (productId) => {
  getBasketFromStorage();
  basketContent.push(productId);
  storeBasketToStorage();
  basketAlertMsg('success', 'Il vous remercie !', 'Votre nouvel ami a été ajouté à votre panier...');
}

const removeFromCart = (productId, teddyNumber) => {
  getBasketFromStorage();
  const index = basketContent.indexOf(productId);
  if (index > -1) {
    basketContent.splice(index, 1);
    const price = getPriceFromId(productId);
    teddiesBasket.removePrice(price);
  }
  storeBasketToStorage();
  let productCard = document.getElementById(teddyNumber).parentElement.parentElement;
  let articles = document.getElementById('articles-in-basket');
  articles.removeChild(productCard);
  basketAlertMsg('danger', 'Il est triste !', 'Votre ex-nouvel ami a été retiré de votre panier...');
  generateTotalAmount();
}

/**
 * Adds click Event Listener to 'Add to cart' button with product id set.
 * @param {string} productId 
 */
export const addToCartEventListener = (productId, button) => {
  const setProductId = (event) => {
    event.stopPropagation();
    event.preventDefault();
    addToCart(productId);
  }
  button.addEventListener('click', setProductId);
}

export const removeFromCartEventListener = (productId, teddyNumber) => {
  const setProductId = () => {
    removeFromCart(productId, teddyNumber);
  }
  let button = document.getElementById(teddyNumber);
  button.addEventListener('click', setProductId);
}

/**
 * Adds the Event Listener to a product card to be clickable and redirects to product details page
 * @param {DOM 'article' element} article 
 */
export const addProductCardListener = (article) => {
  article.addEventListener('click', (event) => {
    location.href = 'productDetails.html?productId=' + article.id;
    /* event.stopPropagation();
    event.preventDefault(); */
  });
}

export const addRegexControlListener = (element, regX) => {
  element.addEventListener('input', function (event) {
    let result = regX.exec(event.target.value);
    if (result === null) {
      element.classList.add('is-invalid');
    } else if (result !== null && element.classList.contains('is-invalid')) {
      element.classList.remove('is-invalid');
    }
  }, false);
}

export const addValidationListener = () => {
  orderForm.addEventListener('submit', function (event) {
    let validation = true;
    for (let element of elements) {
      if (element.classList.contains('is-invalid')) {
        validation = false;
      }
    }
    if (validation === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, false);
}