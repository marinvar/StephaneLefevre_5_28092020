import { getBasketFromStorage, formatPrice } from './utilities';
import { teddiesBasket, basketContent, teddyBears } from './constants';
import { removeFromCartEventListener } from './addListeners';

export const clearDisplayedBasket = () => {
  let articlesInBasket = document.getElementById('articles-in-basket');
  articlesInBasket.innerHTML = "";
}

export const generateBasket = () => {
  clearDisplayedBasket();
  generateTotalAmount();
  getBasketFromStorage()
  for (let index in basketContent) {
    let teddyId = -1;
    let productId;
    let teddyNumber;
    if (index > -1) {
      teddyNumber = 'teddy' + index;
      productId = basketContent[index];
      teddyId = teddyBears.findIndex(function(teddy, index) {
        if (teddy.id === productId) return true;
      });
    } 
    if (teddyId >= 0) {
      let teddy = teddyBears[teddyId];
      teddiesBasket.addPrice(teddy.price);
      let article = document.createElement('article');
      article.classList.add('card','my-3','btn-group');

      let container = document.createElement('div');
      container.classList.add('row','card-body','m-0');


      let image = document.createElement('img');
      image.setAttribute('src',teddy.imageUrl);
      image.classList.add('img-fluid','col-sm-3','p-0','img-basket-product');
  
      let title = document.createElement('h3');
      title.classList.add('col-sm-6','my-0','align-self-center','p-0','p-sm-2');
      title.textContent = teddy.name;
  
      let price = document.createElement('h6');
      price.classList.add('col-sm-2','col-8','text-sm-end','align-self-center','my-0','p-0','p-sm-2');
      price.textContent = formatPrice(teddy.price);

      let deleteProduct = document.createElement('button');
      deleteProduct.setAttribute('id', teddyNumber);
      deleteProduct.classList.add('col-sm-1','col-4','remove-from-cart','align-self-center','btn','text-center','bg-danger','my-0','ms-auto');
      deleteProduct.innerHTML = '<i class="bi bi-trash"></i>';
      
      container.appendChild(image);
      container.appendChild(title);
      container.appendChild(price);
      container.appendChild(deleteProduct);
      
      article.appendChild(container);
      
      let articlesInBasket = document.getElementById('articles-in-basket');
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