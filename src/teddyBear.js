/**
 * Represents a TeddyBear
 * @constructor
 * @param {string} id - The ID of the bear
 * @param {string} name - The name of the bear
 * @param {Array} colors - An array of colors strings
 * @param {price} integer - The bear's price in cents
 * @param {imageUrl} url - The url of the picture of the bear
 * @param {string} description - The description of the bear
 */
class TeddyBear  {
  constructor (id, name, colors, price, imageUrl, description) {
    this.id = id,
    this.name = name,
    this.colors = colors,
    this.price = price,
    this.imageUrl = imageUrl,
    this.description = description
  }
}

export default TeddyBear;