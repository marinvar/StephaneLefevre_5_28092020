import { formatPrice, needToScroll } from './utilities.js';
import { addProductCardListener, addToCartEventListener } from './addListeners';
import { teddyBears } from './constants';

/**
 * Adds product details to the product details card.
 * @param {TeddyBear class instance} teddyBear - A class instance of TeddyBear
 */
export const createDetailsCard = (teddyBear) => {
  const article = document.getElementById('teddyCard');
  article.setAttribute('id', teddyBear.id);

  const title = document.getElementById('cardTitle');
  title.textContent = teddyBear.name;

  const price = document.getElementById('cardPrice');
  price.textContent = formatPrice(teddyBear.price);;

  const image = document.getElementById('cardImg');
  image.setAttribute('src', teddyBear.imageUrl);

  const description = document.getElementById('cardCaption');
  description.textContent = teddyBear.description;

  const teddyColors = document.getElementById('teddyColors');
  for (let color of teddyBear.colors) {
    const option = document.createElement('option');
    option.text = color;
    teddyColors.add(option);
  }
}

/**
 * Creates a product card DOM object to insert in home page.
 * @param {TeddyBear class instance} teddy - A class instance of TeddyBear
 * @returns DOM element to insert in page
 */
const createProductCard = (teddy) => {
  const article = document.createElement('article');
  article.setAttribute('id', teddy.id);
  article.classList.add('card','col-6','col-md-4','m-3');

  const figure = document.createElement('figure');
  figure.classList.add('card-body','figure');

  const title = document.createElement('h4');
  title.classList.add('card-title');
  title.textContent = teddy.name;

  const price = document.createElement('h5');
  price.textContent = formatPrice(teddy.price);

  const buttonAddToCart = document.createElement('button');
  buttonAddToCart.setAttribute('id','add-to-cart-home-' + teddy.id);
  buttonAddToCart.classList.add('btn', 'btn-success', 'mb-3');
  buttonAddToCart.innerHTML = 'Ajouter au panier';

  const image = document.createElement('img');
  image.classList.add('card-img-top','figure-img','img-fluid');
  image.setAttribute('src', teddy.imageUrl);
  image.setAttribute('alt', 'Un ours en peluche fait main');

  const description = document.createElement('figcaption');
  description.classList.add('card-text','figure-caption');
  description.textContent = teddy.description;

  figure.appendChild(image);
  figure.appendChild(title);
  figure.appendChild(price);
  figure.appendChild(buttonAddToCart);
  figure.appendChild(description);
  article.appendChild(figure);

  addProductCardListener(article);
  return article;
}


/**
 * creates a new card for each product
 * then adds it to the products display container
 */
export const createCards = () => {
  if (teddyBears.length > 0) {
    const articles = document.getElementById("articles");
    /* Iterates on teddyBears array to generate product cards */
    for (let teddy of teddyBears) {
      const article = createProductCard(teddy);
      articles.appendChild(article);
      const button = document.getElementById('add-to-cart-home-' + teddy.id);
      addToCartEventListener(teddy.id, button);
    }

    /* Adding scrollTo behaviour when coming from a product detail page, to go directly to last clicked product */
    needToScroll();

  } else {
    articles.innerHTML = "<p>Aucun article dans cette catégorie en ce moment... Veuillez réessayer plus tard !</p>"
  }
}

/**
 * Generates a product card in the order page.
 * @param {string} teddyId - ID of the product to display in the order
 * @param {integer} teddyPrice - Price of a single article of the product
 * @param {integer} teddyQuantity - quantity of products to put in order
 * @returns DOM element to insert in page
 */
export const generateOrderProduct = (teddyId, teddyPrice, teddyQuantity) => {
  const index = teddyBears.findIndex(teddy => teddy.id === teddyId);
  const teddy = teddyBears[index];
  const article = document.createElement('article');
  article.classList.add('card','my-3','btn-group');

  const container = document.createElement('div');
  container.classList.add('row','card-body','m-0');

  const title = document.createElement('h3');
  title.classList.add('col-sm-7','col-12','my-0','align-self-center','p-0','p-sm-2');
  title.textContent = teddy.name;

  const quantityAmount = document.createElement('div');
  if (teddyQuantity > 1) {
    quantityAmount.classList.add('col-sm-2','col-5','text-end','align-self-center','my-0','p-0','p-sm-2');
    quantityAmount.textContent = formatPrice(teddyQuantity * teddyPrice);
  }
  
  const price = document.createElement('h6');
  price.classList.add('text-end','align-self-center','my-0','p-0','p-sm-2');
  teddyQuantity > 1 ? price.classList.add('col-sm-3','col-7') : price.classList.add('col-sm-5','col-12')
  price.textContent = teddyQuantity > 1 ? formatPrice(teddyPrice) + ' X' + teddyQuantity : formatPrice(teddyPrice);
  
  container.appendChild(title);
  container.appendChild(price);
  teddyQuantity > 1 ? container.appendChild(quantityAmount) : "";
  
  article.appendChild(container);
  return article;
}

/**
 * Generates DOM element containing validated order text to insert in order page once order validated by server.
 * @param {object} user - Information about the user sending the order
 * @param {string} orderId - ID of the order passed to the server
 * @param {integer} totalAmount - the total amount of the order
 * @returns DOM element to insert in page
 */
export const generateUserInfo = (user, orderId, totalAmount) => {
  const article = document.createElement('div');
  article.innerHTML = "<p>Merci <strong>" + user.firstName + " " + user.lastName + 
  "</strong>, votre commande a été validée.</p><p>Elle porte désormais le charmant petit nom de : <strong>" + 
  orderId + "</strong>.</p><p>Elle vous sera livrée sous 12 mois dans les plus brefs délais à l'adresse :</p>"
   + "<p><strong>" + user.address + "</strong>, dans le joli village de <strong>" + user.city
   + "</strong>.</p><p>Vous faire de nouveaux amis vous aura coûté <strong>" + totalAmount + "</strong> au total.</p>";

  return article;
}