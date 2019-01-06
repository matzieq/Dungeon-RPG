export default class GameObject {
    constructor(x, y, imageData, tileSize) {
        this.x = x;
        this.y = y;
        this.imageData = imageData;
        this.tileSize = tileSize;
    }

    draw (context, adjustedX, adjustedY) {
        if (this.imageData.loaded) {
            context.drawImage(
                this.imageData.handle, 
                adjustedX * this.tileSize, 
                adjustedY * this.tileSize
            );
        }
    }
}