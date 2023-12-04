class Collectible {
  constructor({ x = 10, y = 10, w = 15, h = 15, value = 1, id }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = value;
    this.id = id;
  }

  draw(context, imgObj) {
    if (this.value === 1) {
      context.drawImage(imgObj.bronzeCoinArt, this.x, this.y);
    } else if (this.value === 2) {
      context.drawImage(imgObj.silverCoinArt, this.x, this.y);
    } else {
      context.drawImage(imgObj.goldCoinArt, this.x, this.y);
    }
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch (e) {}

export default Collectible;
