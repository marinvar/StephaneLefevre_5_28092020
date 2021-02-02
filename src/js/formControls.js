import { addRegexControlListener, addValidationListener } from './addListeners';
import { regxName, regxAddress, regxCity, regxEmail } from './constants';

export const orderForm = document.getElementById('order-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
export const elements = [firstName, lastName, address, city, email];

/**
 * Adds regex controls to each input element of the order form, and the submit validation control to the form itself.
 */
export const addRegexControls = () => {
  addRegexControlListener(firstName, regxName);
  addRegexControlListener(lastName, regxName);
  addRegexControlListener(address, regxAddress);
  addRegexControlListener(city, regxCity);
  addRegexControlListener(email, regxEmail);
  addValidationListener();
}

