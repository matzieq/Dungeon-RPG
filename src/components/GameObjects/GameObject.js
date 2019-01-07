export default class GameObject {
    constructor(x, y, imageData, world, type) {
        this.x = x;
        this.y = y;
        this.imageData = imageData;
        this.world = world;
        this.type = type;
    }

    draw (context, adjustedX, adjustedY) {
        if (this.imageData.loaded) {
            context.drawImage(
                this.imageData.handle, 
                0, 0, this.world.tileSize, this.world.tileSize,

                adjustedX * this.world.tileSize, 
                adjustedY * this.world.tileSize,
                this.world.tileSize,
                this.world.tileSize
            );
        }
    }
}