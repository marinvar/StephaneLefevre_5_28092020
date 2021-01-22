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
  basketAlertMsg('success', 'Merci !', 'Votre nouvel ami a été ajouté à votre panier...');
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
  basketAlertMsg('danger', 'Il est triste !', 'Votre ex nouvel ami a été retiré de votre panier...');
  generateTotalAmount();
}

/**
 * Adds click Event Listener to 'Add to cart' button with product id set.
 * @param {string} productId 
 */
export const addToCartEventListener = (productId) => {
  const setProductId = () => {
    addToCart(productId);
  }
  let button = document.getElementById('add-to-cart');
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
    event.stopPropagation();
    location.href = 'productDetails.html?productId=' + event.target.id;
  });
}