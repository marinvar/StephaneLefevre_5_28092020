import { addRegexControlListener, addValidationListener } from './addListeners';

export let orderForm = document.getElementById('order-form');
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
export let elements = [firstName, lastName, address, city, email];

export const addRegexControls = () => {
  addRegexControlListener(firstName, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,20}$/);
  addRegexControlListener(lastName, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,20}$/);
  addRegexControlListener(address, /^[A-Za-z0-9À-ÖØ-öø-ÿ-\s,\.']{1,100}$/);
  addRegexControlListener(city, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,50}$/);
  addRegexControlListener(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  addValidationListener();
}

