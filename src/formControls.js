let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
let orderButton = document.getElementById('orderButton');

const addRegexControl = (element, regX) => {
  /* let element = document.getElementById(el); */
  element.addEventListener('input', function (event) {
    let elRGEX = regX;
    let result = elRGEX.exec(event.target.value);
    if (result === null && element !== email) {
      element.classList.add('is-invalid');
      /* orderButton.disabled = true; */
    } else if (result === null && element === email) {
      element.classList.add('is-invalid-email');
      /* orderButton.disabled = true; */
    } else if (result !== null && element.classList.contains('is-invalid') && element !== email) {
      element.classList.remove('is-invalid');
      /* orderButton.disabled = false; */
    } else if (result !== null && element.classList.contains('is-invalid-email') && element === email) {
      element.classList.remove('is-invalid-email');
      /* orderButton.disabled = false; */
    }
    isAllValid();
  });
}

const isAllValid = () => {
  const elements = [firstName, lastName, address, city, email];
  let allValid = true;
  for (let element of elements) {
    if (element.value.length === 0 || element.classList.contains('is-invalid') || element.classList.contains('is-invalid-email')) {
      allValid = false;
    }
  }
  console.log(allValid);
  if (allValid && orderButton.disabled === true) {
    orderButton.disabled = false;
  } else if (!allValid && orderButton.disabled === false) {
    orderButton.disabled = true;
  };
}

export const addRegexControls = () => {
  addRegexControl(firstName, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,20}$/);
  addRegexControl(lastName, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,20}$/);
  addRegexControl(address, /^[A-Za-z0-9À-ÖØ-öø-ÿ-\s,\.']{1,100}$/);
  addRegexControl(city, /^[A-Za-zÀ-ÖØ-öø-ÿ-\s']{1,50}$/);
  /* addRegexControl(email, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); */
  addRegexControl(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

