/**
 * Represents the total basket price
 * @constructor
 * @param {integer} initialAmount - The initial price of articles contained in the basket
 */
export default class BasketAmount {
  constructor (initialAmount = 0) {
    this.amount = initialAmount;
  }
  
  addPrice (articlePrice) {
    this.amount += articlePrice;
  }
  removePrice (articlePrice) {
    if (this.amount - articlePrice > 0) {
      this.amount -= articlePrice;
    } else {
      this.amount = 0;
    }
  }
  getTotalAmount () {
    return this.amount;
  }
}