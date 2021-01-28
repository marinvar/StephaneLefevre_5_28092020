import { formatPrice, storeBasketToStorage, 
  basketAlertMsg, getPriceFromId } from './utilities';
import { teddiesBasket, teddyBears } from './constants';
import { removeFromCartEventListener } from './addListeners';
import BasketAmount from './Basket';

const generateBasketProduct = (teddyId, teddyPrice, teddyQuantity) => {
  const index = teddyBears.findIndex(teddy => teddy.id === teddyId);
  const teddyNumber = 'teddy' + index;
  let teddy = teddyBears[index];
  let article = document.createElement('article');
  article.classList.add('card','my-3','btn-group');

  let container = document.createElement('div');
  container.classList.add('row','card-body','m-0');


  let image = document.createElement('img');
  image.setAttribute('src',teddy.imageUrl);
  image.classList.add('img-fluid','col-sm-3','p-0','img-basket-product');

  let title = document.createElement('h3');
  title.classList.add('col-sm-3','my-0','align-self-center','p-0','p-sm-2');
  title.textContent = teddy.name;

  let quantityAmount = document.createElement('div');
  let price = document.createElement('h6');
  if (teddyQuantity > 1) {
    quantityAmount.classList.add('col-sm-2','col-3','text-sm-end','align-self-center','my-0','p-0','p-sm-2');
    quantityAmount.textContent = formatPrice(teddyQuantity * teddyPrice);
  }

  price.classList.add('text-sm-end','align-self-center','my-0','p-0','p-sm-2');
  teddyQuantity > 1 ? price.classList.add('col-sm-3','col-5') : price.classList.add('col-sm-5','col-8')
  price.textContent = teddyQuantity > 1 ? formatPrice(teddyPrice) + ' X' + teddyQuantity : formatPrice(teddyPrice);

  let deleteProduct = document.createElement('button');
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

export const generateBasketFromStorage = () => {
  let storageCart_json = localStorage.getItem("teddiesCartBasket");
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
 * Stores basket content to localStorage
 */
export const saveBasketToStorage = () => {
  let storageCart_json = JSON.stringify(teddiesBasket.getTeddies());
  localStorage.setItem("teddiesCartBasket", storageCart_json);
}

export const generateBasket = () => {
  const teddies = teddiesBasket.getTeddies();
  let articlesInBasket = document.getElementById('articles-in-basket');
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


export const generateTotalAmount = () => {
  let total = document.createElement('article');
  total.classList.add('row','my-3','mx-0','p-0');

  let container = document.createElement('div');
  container.classList.add('row','my-3','mx-0','p-0');

  let title = document.createElement('h3');
  title.classList.add('col-9','p-0');
  title.textContent = 'Montant total de votre panier';
  
  let price = document.createElement('span');
  price.classList.add('col-3','align-self-center','text-end','ms-auto', 'p-0');
  price.textContent = formatPrice(teddiesBasket.getTotalAmount());

  container.appendChild(title);
  container.appendChild(price);

  total.appendChild(container);

  let totalAmount = document.getElementById('total-amount');
  totalAmount.innerHTML = "";
  totalAmount.appendChild(total);
}

export const removeFromCart = (productId, teddyNumber) => {
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
  basketAlertMsg('danger', 'Il est triste !', 'Votre ex-nouvel ami a été retiré de votre panier...');
  generateTotalAmount();
}