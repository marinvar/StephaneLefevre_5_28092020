import { generateBasket, generateTotalAmount, saveBasketToStorage, updateBasketBadge } from './basketOperations';
import { teddiesBasket } from './constants';
import { orderForm, elements } from './formControls';
import { getPriceFromId, basketAlertMsg } from './utilities';

/**
 * Adds click Event Listener to 'Add to cart' button with product id set.
 * @param {string} productId - ID of the product to add to cart
 */
export const addToCartEventListener = (productId, button) => {
  const setProductId = (event) => {
    event.stopPropagation();
    event.preventDefault();
    teddiesBasket.addTeddy(productId, getPriceFromId(productId), 1);
    saveBasketToStorage();
    updateBasketBadge();

    basketAlertMsg('success', 'Il vous remercie !', 'Votre nouvel ami a été ajouté à votre panier...');

  }
  button.addEventListener('click', setProductId);
}

/**
 * Adds event listener to trash button on individual product card in basket.
 * @param {string} productId - ID of the product to remove from cart
 * @param {integer} teddyNumber - ID of the product card where to add the listener
 */
export const removeFromCartEventListener = (productId, teddyNumber) => {
  const setProductId = () => {
    teddiesBasket.removeTeddy(productId);
    generateBasket();
    saveBasketToStorage();
    generateTotalAmount();
    updateBasketBadge();
    basketAlertMsg('danger', 'Il est triste !', 'Votre ex-nouvel ami a été retiré de votre panier...');
  }
  const button = document.getElementById(teddyNumber);
  button.addEventListener('click', setProductId);
}

/**
 * Adds the Event Listener to a product card to be clickable and redirects to product details page.
 * @param {DOM element} article - An article DOM element to add listener to
 */
export const addProductCardListener = (article) => {
  article.addEventListener('click', (event) => {
    location.href = 'productDetails.html?productId=' + article.id;
  });
}

/**
 * Adds listener to an input DOM element to check compliance with a regex string.
 * @param {DOM input element} element - element on which to add the regex control listener
 * @param {regex string} regex - The regex to string to match content of the input with 
 */
export const addRegexControlListener = (element, regX) => {
  element.addEventListener('input', function (event) {
    const result = regX.exec(event.target.value);
    if (result === null) {
      element.classList.add('is-invalid');
    } else if (result !== null && element.classList.contains('is-invalid')) {
      element.classList.remove('is-invalid');
    }
  }, false);
}

/**
 * Adds event listener to a form to verify if all inputs are valid before submitting
 */
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