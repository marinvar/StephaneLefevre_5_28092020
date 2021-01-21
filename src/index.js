import { retrieveTeddies, getTeddyDetails } from './queryTeddies.js';
import TeddyBear from './teddyBear';
import { formatPrice, getUrlParamsProductId, needToScroll } from './utilities.js';
import { addToCartEventListener, addProductCardListener } from './addListeners';
import { teddyBears } from './constants';
import { generateBasket, generateTotalAmount } from './basket';

/**
 * A product details object with which create a product details card
 * @param {TeddyBear class instance} teddyBear - A class instance of TeddyBear
 */
const createDetailsCard = (teddyBear) => {
  let article = document.getElementById('teddyCard');
  article.setAttribute('id', teddyBear.id);

  let title = document.getElementById('cardTitle');
  title.textContent = teddyBear.name;

  let price = document.getElementById('cardPrice');
  price.textContent = formatPrice(teddyBear.price);

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
}


/**
 * Creates details for card template with product details and options,
 * and a link to go back to products list with scrollTo ability
 * @param {string} productId 
 */
const showTeddyDetails = async (productId) => {
  try {
    /* Wait to retrieve data from database with promise */
    const teddy = await (getTeddyDetails(productId));

    const teddyBear = new TeddyBear(teddy._id, teddy.name, teddy.colors, teddy.price, teddy.imageUrl, teddy.description);

    /* creates card details and adds listener */
    createDetailsCard(teddyBear);
    addToCartEventListener(teddyBear.id);

    /* creates back link details for scrollTo feature on home page */
    document.getElementById('backToProducts').setAttribute('href', 'index.html?productId=' + teddyBear.id);
  }
  catch (e) {
    console.error('Error while looking at Teddy details: ', e);
  }
};

/**
 * Creates a product card DOM object to insert in home page
 * @param {TeddyBear class instance} teddy - A class instance of TeddyBear
 */
const createProductCard = (teddy) => {
  let article = document.createElement('article');
      article.setAttribute('id', teddy.id);
      article.classList.add('card','col-6','col-md-4','m-3');

      let figure = document.createElement('figure');
      figure.classList.add('card-body','figure');

      let title = document.createElement('h4');
      title.classList.add('card-title');
      title.textContent = teddy.name;

      let price = document.createElement('h5');
      price.textContent = formatPrice(teddy.price);

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

      addProductCardListener(article);
      return article;
}

/**
 * creates a new card for each product
 * then adds it to the products display container
 */
const createCards = () => {
  if (teddyBears.length > 0) {
    let articles = document.getElementById("articles");
    /* Iterates on teddyBears array to generate product cards */
    for (let teddy of teddyBears) {
      let article = createProductCard(teddy);
      articles.appendChild(article);
    }

    /* Adding scrollTo behaviour when coming from a product detail page, to go directly to last clicked product */
    needToScroll();

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

  } catch (e) {
    console.error('Error during products retrieval or product cards creation', e);
  }
}

/**
 * When loading page, tests if page is products list, product detail or basket page to download right data
 */
const main = () => {
  const classList = document.getElementsByTagName('body')[0].classList;
  if (classList.contains('homepage')) {
    getTeddies()
    .then(() => {
      createCards();
    });

  } else if (classList.contains('product-details-page')) {
    const productId = getUrlParamsProductId()[0];
    showTeddyDetails(productId);

  } else if (classList.contains('basket-page')) {
    getTeddies()
    .then(() => {
      generateBasket();
      generateTotalAmount();
    });
  }
}

main();