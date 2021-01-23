let orderForm = document.getElementById('order-form');
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let elements = [firstName, lastName, address, city, email];

const addRegexControl = (element, regX) => {
  element.addEventListener('input', function (event) {
    let result = regX.exec(event.target.value);
    if (result === null) {
      element.classList.add('is-invalid');
    } else if (result !== null && element.classList.contains('is-invalid')) {
      element.classList.remove('is-invalid');
    }
  }, false);
}

const addValidationListener = () => {
  orderForm.addEventListener('submit', function (event) {
    let validation = true;
    for (let element of elements) {
      if (element.classList.contains('is-invalid')) {
        validation = false;
      }
    }
    if (validation === false) {
      event.preventDefault();
      event.stopPropagation();
      }
  }, false);
}

export const addRegexControls = () => {
  addRegexControl(firstName, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,20}$/);
  addRegexControl(lastName, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,20}$/);
  addRegexControl(address, /^[A-Za-z0-9À-ÖØ-öø-ÿ-\s,\.']{1,100}$/);
  addRegexControl(city, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,50}$/);
  addRegexControl(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  addValidationListener();
}

