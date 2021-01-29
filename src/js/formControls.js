import { addRegexControlListener, addValidationListener } from './addListeners';
import { regxName, regxAddress, regxCity, regxEmail } from './constants';

export let orderForm = document.getElementById('order-form');
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
export let elements = [firstName, lastName, address, city, email];

export const addRegexControls = () => {
  addRegexControlListener(firstName, regxName);
  addRegexControlListener(lastName, regxName);
  addRegexControlListener(address, regxAddress);
  addRegexControlListener(city, regxCity);
  addRegexControlListener(email, regxEmail);
  addValidationListener();
}

