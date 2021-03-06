/**
 * Represents the basket itself.
 * @constructor
 * @param {integer} initialAmount - The initial price of articles contained in the basket
 * @param {object} teddies - An object containing each teddy object with price and quantity
 */
export default class Basket {
  constructor (initialAmount = 0, teddies = {}) {
    if (parseFloat(initialAmount) >= 0) {
      this.amount = initialAmount;
    } else {
      this.amount = 0;
    }
    this.teddies = teddies;
  }

  getTotalAmount () {
    let price = 0;
    for (const product of Object.values(this.teddies)) {
      price += product.price * product.quantity;
    }
    return price;
  }

  getProductsQuantity() {
    let quantity = 0;
    for (const product of Object.values(this.teddies)) {
      quantity += product.quantity;
    }
    return quantity;
  }

  getTeddies () {
    return this.teddies;
  }

  addTeddy (productId, price, quantity) {
    const teddies = this.teddies;
    const indexFound = Object.keys(teddies).indexOf(productId);
    if (indexFound === -1 && quantity > 0) {
      teddies[productId] = {
        price: price,
        quantity: quantity
      }
    } else if (indexFound > -1 && quantity >= 0) {
      teddies[productId].quantity += quantity;
    }
  }

  removeTeddy (productId) {
    const teddies = this.teddies;
    const indexFound = Object.keys(teddies).indexOf(productId);
    if (indexFound > -1) {
      delete teddies[productId];
    }
  }

  clearBasket () {
    this.teddies = {};
    this.amount = 0;
  }
}