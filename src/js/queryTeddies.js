import { displayOrder } from './orderOperations';

export async function retrieveTeddies() {
  const url = "http://localhost:3000/api/teddies";

  const response = await fetch(url);
  return response.json();
}

export async function getTeddyDetails(productId) {
  const url = 'http://localhost:3000/api/teddies/' + productId;

  const response = await fetch(url);
  return response.json();
}

export async function sendOrder(teddies, user) {
  const jsonData = {};
  jsonData.contact = user;
  jsonData.products = teddies;
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
      const response = JSON.parse(this.responseText);
      displayOrder(response);
    }
  }
  request.open("POST", "http://localhost:3000/api/teddies/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(jsonData));
}