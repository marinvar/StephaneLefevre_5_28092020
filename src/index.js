import { retrieveTeddies, getTeddyDetails, sendOrder } from './js/queryTeddies.js';
import TeddyBear from './js/TeddyBear';
import { getUrlParamsProductId } from './js/utilities.js';
import { addToCartEventListener } from './js/addListeners';
import { teddyBears } from './js/constants';
import { generateBasket, generateTotalAmount, generateBasketFromStorage, updateBasketBadge } from './js/basketOperations';
import { createDetailsCard, createCards } from './js/generateCards';
import { addRegexControls } from './js/formControls';
import { generateOrderList, setUser } from './js/orderOperations';

/**
 * Creates details for card template with product details and options,
 * and a link to go back to products list with scrollTo ability
 * @param {string} productId - ID of the product from which to get details
 */
const showTeddyDetails = async (productId) => {
  try {
    /* Wait to retrieve data from database with promise */
    const teddy = await (getTeddyDetails(productId));
    const teddyBear = new TeddyBear(teddy._id, teddy.name, teddy.colors, teddy.price, teddy.imageUrl, teddy.description);

    /* creates card details and adds listener */
    createDetailsCard(teddyBear);
    let button = document.getElementById('add-to-cart');
    addToCartEventListener(teddyBear.id, button);

    /* creates back link details for scrollTo feature on home page */
    document.getElementById('backToProducts').setAttribute('href', 'index.html?productId=' + teddyBear.id);
  }
  catch (e) {
    console.error('Error while looking at Teddy details: ', e);
  }
};

/**
 * On page loading, waiting for teddies list download to create teddies class instances and display cards
 */ 
const getTeddies = async () => {
  try {
    const teddies = await retrieveTeddies();
    for (let teddy of teddies) {
      const teddyBear = new TeddyBear(teddy._id, teddy.name, teddy.colors, teddy.price, teddy.imageUrl, teddy.description);
      teddyBears.push(teddyBear);
    }
    updateBasketBadge();
  } catch (e) {
    console.error('Error during products retrieval or product cards creation', e);
  }
}

/**
 * When loading page, tests if page is products list, product detail or basket page to download right data
 */
const main = () => {
  const classList = document.getElementsByTagName('body')[0].classList;
  generateBasketFromStorage();
  
  if (classList.contains('homepage')) {
    getTeddies()
    .then(() => {
      createCards();
    });

  } else if (classList.contains('product-details-page')) {
    const productId = getUrlParamsProductId()[0];
    getTeddies()
    .then(() => {
      showTeddyDetails(productId);
    });

  } else if (classList.contains('basket-page')) {
    getTeddies()
    .then(() => {
      generateBasket();
      generateTotalAmount();
      addRegexControls();
    });
  } else if (classList.contains('order-page')) {
    getTeddies()
    .then(() => {
      const teddies = generateOrderList();
      const user = setUser();
      if (teddies.length > 0) {
        sendOrder (teddies, user);
      }
    });
  }
}

main();