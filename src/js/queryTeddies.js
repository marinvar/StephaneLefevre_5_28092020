import { displayOrder } from './orderOperations';

/**
 * Get available products information from the server.
 * @returns {Array} Array of objects containing products information
 */
export async function retrieveTeddies() {
  const url = "http://localhost:3000/api/teddies";

  const response = await fetch(url);
  return response.json();
}

/**
 * Retrieve information about a specific product from the server, by product ID.
 * @param {string} productId - The ID of the product to get information about
 * @returns {object} available product information
 */
export async function getTeddyDetails(productId) {
  const url = 'http://localhost:3000/api/teddies/' + productId;

  const response = await fetch(url);
  return response.json();
}

/**
 * Sends the order to the server and retrieves response with order information, then displays result.
 * @param {Array} teddies - Array of products IDs to order
 * @param {object} user - object containing user information
 */
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