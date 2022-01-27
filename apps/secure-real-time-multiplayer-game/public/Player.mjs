import { canvasCalcs } from './canvas-data.mjs';

class Player {
  constructor({ x = 10, y = 10, w = 30, h = 30, score = 0, main, id }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 5;
    this.score = score;
    this.id = id;
    this.movementDirection = {};
    this.isMain = main;
  }

  draw(context, coin, imgObj, currPlayers) {
    const currDir = Object.keys(this.movementDirection).filter(dir => this.movementDirection[dir]);
    currDir.forEach(dir => this.movePlayer(dir, this.speed));

    if (this.isMain) {
      context.font = `13px 'Press Start 2P'`;
      context.fillText(this.calculateRank(currPlayers), 560, 32.5);

      context.drawImage(imgObj.mainPlayerArt, this.x, this.y);
    } else {
      context.drawImage(imgObj.otherPlayerArt, this.x, this.y);
    }

    if (this.collision(coin)) {
      coin.destroyed = this.id;
    }
  }

  moveDir(dir) {
    this.movementDirection[dir] = true;
  }

  stopDir(dir) {
    this.movementDirection[dir] = false;
  }

  movePlayer(dir, speed) {
    if (dir === 'up') this.y - speed >= canvasCalcs.playFieldMinY ? this.y -= speed : this.y -= 0;
    if (dir === 'down') this.y + speed <= canvasCalcs.playFieldMaxY ? this.y += speed : this.y += 0;
    if (dir === 'left') this.x - speed >= canvasCalcs.playFieldMinX ? this.x -= speed : this.x -= 0;
    if (dir === 'right') this.x + speed <= canvasCalcs.playFieldMaxX ? this.x += speed : this.x += 0;
  }

  collision(item) {
    if (
      (this.x < item.x + item.w &&
        this.x + this.w > item.x &&
        this.y < item.y + item.h &&
        this.y + this.h > item.y)
    )
      return true;
  }

  calculateRank(arr) {
    const sortedScores = arr.sort((a, b) => b.score - a.score);
    const mainPlayerRank = this.score === 0 ? arr.length : (sortedScores.findIndex(obj => obj.id === this.id) + 1);

    return `Rank: ${mainPlayerRank} / ${arr.length}`
  }
}

export default Player;
