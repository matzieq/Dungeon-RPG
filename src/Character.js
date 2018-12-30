export default class Character {
    constructor(x, y, imageData, tileSize) {
        this.x = x;
        this.y = y;
        this.imageData = imageData;
        this.tileSize = tileSize;
    }

    draw (context) {
        context.drawImage(this.imageData.handle, this.x * this.tileSize, this.y * this.tileSize);
    }
}