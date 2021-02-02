import { formatPrice, basketAlertMsg, getPriceFromId } from './utilities';
import { teddiesBasket, teddyBears } from './constants';
import { removeFromCartEventListener } from './addListeners';
import BasketAmount from './Basket';

/**
 * Creates a DOM element containing, name, description, price and color of the product to appear in the basket.
 * @param {string} teddyId - ID of the product to display
 * @param {integer} teddyPrice - price of a single unity of the product
 * @param {integer} teddyQuantity - quantity of articles of this product
 * @returns {DOM element} article DOM element containing the product information
 */
export const generateBasketProduct = (teddyId, teddyPrice, teddyQuantity) => {
  const index = teddyBears.findIndex(teddy => teddy.id === teddyId);
  const teddyNumber = 'teddy' + index;
  const teddy = teddyBears[index];
  const article = document.createElement('article');
  article.classList.add('card','my-3','btn-group');

  const container = document.createElement('div');
  container.classList.add('row','card-body','m-0');


  const image = document.createElement('img');
  image.setAttribute('src',teddy.imageUrl);
  image.classList.add('img-fluid','col-sm-3','p-0','img-basket-product');

  const title = document.createElement('h3');
  title.classList.add('col-sm-3','my-0','align-self-center','p-0','p-sm-2');
  title.textContent = teddy.name;

  const quantityAmount = document.createElement('div');
  const price = document.createElement('h6');
  if (teddyQuantity > 1) {
    quantityAmount.classList.add('col-sm-2','col-3','text-sm-end','align-self-center','my-0','p-0','p-sm-2');
    quantityAmount.textContent = formatPrice(teddyQuantity * teddyPrice);
  }

  price.classList.add('text-sm-end','align-self-center','my-0','p-0','p-sm-2');
  teddyQuantity > 1 ? price.classList.add('col-sm-3','col-5') : price.classList.add('col-sm-5','col-8')
  price.textContent = teddyQuantity > 1 ? formatPrice(teddyPrice) + ' X' + teddyQuantity : formatPrice(teddyPrice);

  const deleteProduct = document.createElement('button');
  deleteProduct.setAttribute('id', teddyNumber);
  deleteProduct.classList.add('col-sm-1','col-4','remove-from-cart','align-self-center','btn','text-center','bg-danger','my-0','ms-auto');
  deleteProduct.innerHTML = '<i class="bi bi-trash"></i>';
  
  container.appendChild(image);
  container.appendChild(title);
  container.appendChild(price);
  teddyQuantity > 1 ? container.appendChild(quantityAmount) : "";
  container.appendChild(deleteProduct);
  
  article.appendChild(container);
  return article;
}

/**
 * Updates the quantity in the basket badge near basket button in the nav menu with quantity of products held in the basket.
 */
export const updateBasketBadge = () => {
    const basketBadge = document.getElementById('basket-count');
  basketBadge.textContent = teddiesBasket.getProductsQuantity();
}

/**
 * Generates the basket instance of Basket class with basket info(id, quantity, price) held in localStorage.
 */
export const generateBasketFromStorage = () => {
  const storageCart_json = localStorage.getItem("teddiesCartBasket");
  const basket = JSON.parse(storageCart_json);
  if (localStorage.getItem("teddiesCartBasket") !== null) {
    let price = 0;
    for (const product of Object.values(basket)) {
      price += product["price"] * product["quantity"];
    }
    teddiesBasket = new BasketAmount(price, JSON.parse(storageCart_json));
  } else {
    teddiesBasket = new BasketAmount();
  }
}

/**
 * Stores basket content from basket instance to localStorage.
 */
export const saveBasketToStorage = () => {
  const storageCart_json = JSON.stringify(teddiesBasket.getTeddies());
  localStorage.setItem("teddiesCartBasket", storageCart_json);
}

/**
 * generates the whole basket content elements from products held in the basket instance.
 */
export const generateBasket = () => {
  const teddies = teddiesBasket.getTeddies();
  const articlesInBasket = document.getElementById('articles-in-basket');
  articlesInBasket.innerHTML = "";
  for (const [productId, params] of Object.entries(teddies)) {
    if (productId !== null) {
      const index = teddyBears.findIndex(teddy => teddy.id === productId);
      const teddyNumber = 'teddy' + index;
      const article = generateBasketProduct(productId, params.price, params.quantity);
      
      articlesInBasket.appendChild(article);
      removeFromCartEventListener(productId, teddyNumber);
    }
  }
}

/**
 * Generates the total amount card in the basket page with total price.
 */
export const generateTotalAmount = () => {
  const total = document.createElement('article');
  total.classList.add('row','my-3','mx-0','p-0');

  const container = document.createElement('div');
  container.classList.add('row','my-3','mx-0','p-0');

  const title = document.createElement('h3');
  title.classList.add('col-9','p-0');
  title.textContent = 'Montant total de votre panier';
  
  const price = document.createElement('span');
  price.classList.add('col-3','align-self-center','text-end','ms-auto', 'p-0');
  price.textContent = formatPrice(teddiesBasket.getTotalAmount());

  container.appendChild(title);
  container.appendChild(price);

  total.appendChild(container);

  const totalAmount = document.getElementById('total-amount');
  totalAmount.innerHTML = "";
  totalAmount.appendChild(total);
}