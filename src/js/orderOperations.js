import { teddiesBasket, regxName, regxAddress, regxCity, regxEmail } from "./constants";
import { getUrlParamsUser, formatPrice } from "./utilities";
import { generateOrderProduct, generateUserInfo } from './generateCards';
import { saveBasketToStorage, updateBasketBadge } from "./basketOperations";

/**
 * Generates the list of items validated in the order and received by server.
 * @returns {Array} list of products validated with their information
 */
export const generateOrderList = () => {
  const teddiesList = [];
  const teddies = teddiesBasket.getTeddies();
  for (const [productId, params] of Object.entries(teddies)) {
    for (let i = 0; i < params.quantity; i++) {
      teddiesList.push(productId);
    }
  };
  return teddiesList;
}

/**
 * Checking user information transmitted in URL, to send to the server with the order if everything is valid.
 * @returns {object} user information, sets an error phrase in order page otherwise
 */
export const setUser = () => {
  const user = getUrlParamsUser();
  let allValid = true;
  for (const [property, value] of Object.entries(user)) {
    if (allValid === true) {
      switch (property) {
        case 'firstName':
          allValid = regxName.exec(value) !== null;
          break;
        case 'lastName':
          allValid = regxName.exec(value) !== null;
          break;
        case 'address':
          allValid = regxAddress.exec(value) !== null;
          break;
        case 'city':
          allValid = regxCity.exec(value) !== null;
          break;
        case 'email':
          allValid = regxEmail.exec(value) !== null;
          break;
        default:
          allValid = false;
          break;
      }
    }
  }
  if (allValid) {
    return user;
  } else {
    const articlesOrder = document.getElementById('articles-in-order');
    articlesOrder.innerHTML = '<p>Désolé, une erreur technique est survenue,<br />veuillez <a href="./basket.html">valider à nouveau votre commande en cliquant ici</a></p>';
  }
}

/**
 * Generates object containing validated products.
 * @param {Array} products - array of products validated in the order
 * @returns {object} products validated in order
 */
const generateTeddiesOrderResult = (products) => {
  const teddies = {};
  for (let product of products) {
    const productId = product._id;
    const indexFound = Object.keys(teddies).indexOf(productId);
    if (indexFound === -1) {
      teddies[productId] = {
        price: product.price,
        quantity: 1
      }
    } else {
      teddies[productId].quantity++;
    }
  }
  return teddies;
}

/**
 * Displays the order validated by server on the order page, with user, order and products information.
 * @param {object} order - object containing whole order validated by server, with user info, order ID and products info 
 */
export const displayOrder = (order) => {
  const contact = order.contact;
  const products = order.products;
  const orderId = order.orderId;
  const userInfo = document.getElementById('order-user');
  const articles = document.getElementById('articles-in-order');
  const teddies = generateTeddiesOrderResult(products);
  let totalAmount = 0;
  
  for (let [teddyId, params] of Object.entries(teddies)) {
    const productId = teddyId;
    const productPrice = params.price;
    const productQuantity = params.quantity;
    totalAmount += params.price * params.quantity;
    const article = generateOrderProduct(productId, params.price, params.quantity);
    articles.appendChild(article);
  }
  const userDetails = generateUserInfo(contact, orderId, formatPrice(totalAmount));
  userInfo.appendChild(userDetails);
  teddiesBasket.clearBasket();
  saveBasketToStorage();
  updateBasketBadge();
}