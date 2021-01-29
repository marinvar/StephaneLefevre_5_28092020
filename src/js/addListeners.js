import { generateBasket, generateTotalAmount, saveBasketToStorage, updateBasketBadge } from './basketOperations';
import { teddiesBasket } from './constants';
import { orderForm, elements } from './formControls';
import { getPriceFromId, basketAlertMsg } from './utilities';

/**
 * Adds click Event Listener to 'Add to cart' button with product id set.
 * @param {string} productId 
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

export const removeFromCartEventListener = (productId, teddyNumber) => {
  const setProductId = () => {
    teddiesBasket.removeTeddy(productId);
    generateBasket();
    saveBasketToStorage();
    generateTotalAmount();
    updateBasketBadge();
    basketAlertMsg('danger', 'Il est triste !', 'Votre ex-nouvel ami a été retiré de votre panier...');
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