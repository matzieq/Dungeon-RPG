export default class GameObject {
    constructor(x, y, imageData, tileSize) {
        this.x = x;
        this.y = y;
        this.imageData = imageData;
        this.tileSize = tileSize;
        console.log(this.imageData);
    }

    draw (context) {
        if (this.imageData.loaded) {
            context.drawImage(this.imageData.handle, this.x * this.tileSize, this.y * this.tileSize);
        }
    }
}