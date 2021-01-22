export const addRegexControls = () => {
  let firstName = document.getElementById('first-name');
  firstName.addEventListener('input', function (event) {
    let nameRGEX = /^[A-Z-\s]{1,20}$/gi;
    let nameResult = nameRGEX.exec(event.target.value);
  });
  
  let lastName = document.getElementById('last-name');
  lastName.addEventListener('input', function (event) {
    let nameRGEX = /^[A-Z-\s]{1,20}$/gi;
    let nameResult = nameRGEX.exec(event.target.value);
  });
  
  let address = document.getElementById('address');
  address.addEventListener('input', function (event) {
    let addressRGEX = /^[A-Z0-9-\s,\.]{1,100}$/gi;
    let addressResult = addressRGEX.exec(event.target.value);
  });
  
  let city = document.getElementById('city');
  city.addEventListener('input', function (event) {
    let cityRGEX = /^[A-Z-\s,\.]{1,50}$/gi;
    let cityResult = cityRGEX.exec(event.target.value);
  });
  
  let email = document.getElementById('email');
  email.addEventListener('input', function (event) {
    let emailRGEX = /^[A-Z-\s,\.]{1,20}$/gi;
    let emailResult = emailRGEX.exec(event.target.value);
  });
}