import { formatPrice, needToScroll } from './utilities.js';
import { addProductCardListener, addToCartEventListener } from './addListeners';
import { teddyBears } from './constants';

/**
 * A product details object with which create a product details card
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
 * Creates a product card DOM object to insert in home page
 * @param {TeddyBear class instance} teddy - A class instance of TeddyBear
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