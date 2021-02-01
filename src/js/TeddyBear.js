/**
 * Represents a TeddyBear
 * @constructor
 * @param {string} id - The ID of the bear
 * @param {string} name - The name of the bear
 * @param {Array} colors - An array of colors strings
 * @param {integer} price - The bear's price in cents
 * @param {url} imageUrl - The url of the picture of the bear
 * @param {string} description - The description of the bear
 */
class TeddyBear  {
  constructor (id, name, colors, price, imageUrl, description) {
    this.id = id,
    this.name = name,
    this.colors = colors,
    this.price = parseFloat(price) > 0 ? price : 0,
    this.imageUrl = imageUrl,
    this.description = description
  }
}

export default TeddyBear;