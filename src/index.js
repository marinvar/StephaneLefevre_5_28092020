import { retrieveTeddies, getTeddyDetails } from './queryTeddies.js';

let teddyBears = [];

class TeddyBear  {
  constructor (_id, name, colors, price, imageUrl, description) {
    this.id = _id,
    this.name = name,
    this.colors = colors,
    this.price = price,
    this.imageUrl = imageUrl,
    this.description = description
  }
}

/**
 * function scrollToProduct is sending the page, with displacement effect, to the last clicked product
 * @param {string} productId 
 */
const scrollToProduct = (productId) => {
  location.hash = '#' + productId;
}

/**
 * function addToBasketMsg notifies user with a bootstrap closable message that product was added to basket
 */
const addToBasketMsg = () => {
  const alertMsg = document.createElement('div');
  alertMsg.classList.add('alert','alert-success','alert-dismissible','fade','show','basket-msg');
  alertMsg.setAttribute('role','alert');
  alertMsg.innerHTML = '<strong>Well done !</strong> Votre nouvel ami a été ajouté à votre panier...' +
  '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
  document.getElementsByTagName('body')[0].appendChild(alertMsg);
}

/**
 * Get basket from localStorage, adds the product to the basket, stores basket in localStorage and notifies user when done
 * @param {string} productId 
 */
const addToCart = (productId) => {
  let storageCart = [];
  /* Retrieve basket content from localStorage if exists and adds product */
  let storageCart_json = localStorage.getItem("teddiesCart");
  if (localStorage.getItem("teddiesCart") !== null) {
    storageCart = JSON.parse(storageCart_json);
  }  
  storageCart.push(productId);

  /* Store content of basket in localStorage and notifies user */
  storageCart_json = JSON.stringify(storageCart);
  localStorage.setItem("teddiesCart", storageCart_json);
  addToBasketMsg();
}

/**
 * function showTeddyDetails creates a card with product details and options,
 * and a link to go back to products list with scrollTo ability
 * @param {string} productId 
 */
const showTeddyDetails = async (productId) => {
  try {
    /* Wait to retrieve data from database with promise */
    const teddy = await (getTeddyDetails(productId));

    const teddyBear = new TeddyBear(teddy._id, teddy.name, teddy.colors, teddy.price, teddy.imageUrl, teddy.description);

    /* Card input for each element of teddy's parameters */
    let article = document.getElementById('teddyCard');
    article.setAttribute('id', teddyBear.id);
    let title = document.getElementById('cardTitle');
    title.textContent = teddyBear.name;
    let price = document.getElementById('cardPrice');
    const teddysPrice = (parseFloat(teddyBear.price / 100)).toFixed(2) + '€';
    price.textContent = teddysPrice;
    let image = document.getElementById('cardImg');
    image.setAttribute('src', teddyBear.imageUrl);
    let description = document.getElementById('cardCaption');
    description.textContent = teddyBear.description;
    let teddyColors = document.getElementById('teddyColors');
    for (let color of teddyBear.colors) {
      let option = document.createElement('option');
      option.text = color;
      teddyColors.add(option);
    }
    let addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', function (event, productId = teddyBear.id) {
      addToCart(productId);
    });
    document.getElementById('backToProducts').setAttribute('href', 'index.html?productId=' + teddyBear.id);
  }
  catch (e) {
    console.log('Error while looking at Teddy details: ', e);
  }
};

/**
 * function addClickListener adds the Event Listener to a product card to be clickable and redirect to product details page
 * @param {DOM 'article' element} article 
 */
const addClickListener = (article) => {
  article.addEventListener('click', (event) => {
    event.stopPropagation();
    location.href = 'productDetails.html?productId=' + event.target.id;
  });
}

/**
 * function createCards is creating a new card for each product
 * then adds it to the products display container
 */
const createCards = () => {
  if (teddyBears.length > 0) {
    let articles = document.getElementById("articles");
    for (let teddy of teddyBears) {
      let article = document.createElement('article');
      article.setAttribute('id', teddy.id);
      article.classList.add('card','col-6','col-md-4','m-3');
      let figure = document.createElement('figure');
      figure.classList.add('card-body','figure');
      let title = document.createElement('h4');
      title.classList.add('card-title');
      title.textContent = teddy.name;
      let price = document.createElement('h5');
      const teddysPrice = (parseFloat(teddy.price / 100)).toFixed(2) + '€';
      price.textContent = teddysPrice;
      let image = document.createElement('img');
      image.classList.add('card-img-top','figure-img','img-fluid');
      image.setAttribute('src', teddy.imageUrl);
      image.setAttribute('alt', 'Un ours en peluche fait main');
      let description = document.createElement('figcaption');
      description.classList.add('card-text','figure-caption');
      description.textContent = teddy.description;
      figure.appendChild(image);
      figure.appendChild(title);
      figure.appendChild(price);
      figure.appendChild(description);
      article.appendChild(figure);
      articles.appendChild(article);
      addClickListener(article);
    }

    /* Adding scrollTo behaviour when coming from a product detail page,
    to go directly to last clicked product */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('productId');
    urlParams.delete('productId');
    if (productId !== null) {
      window.history.replaceState(null, null, window.location.pathname);
      scrollToProduct(productId);
    }
  } else {
    articles.innerHTML = "<p>Aucun article dans cette catégorie en ce moment... Veuillez réessayer plus tard !</p>"
  }
}

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
    createCards();

  } catch (e) {
    console.log('Error', e);
  }
}

/**
 * When loading page, testing if page is products list or product detail to download right data
 */
if (document.getElementsByTagName('body')[0].classList.contains('homepage')) {
  getTeddies();
} else if (document.getElementsByTagName('body')[0].classList.contains('productDetailsPage')) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get('productId');
  showTeddyDetails(productId);
}

