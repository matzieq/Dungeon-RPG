export default class Camera {
    constructor(x, y, viewportWidth, viewportHeight) {
        this.x = x;
        this.y = y;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    centerOn (gameObject) {
        this.x = Math.floor(gameObject.x - this.viewportWidth / 2);
        this.y = Math.floor(gameObject.y - this.viewportHeight / 2);
    }

    calculateViewportCoordinates (levelWidth, levelHeight) {
        let startingRow = Math.min(
            Math.max(0, this.y),
            levelHeight - this.viewportHeight);
        let finalRow = Math.max(
            Math.min(
                levelHeight, 
                this.y + this.viewportHeight
            ), this.viewportHeight);

        let startingColumn = Math.min(
            Math.max(0, this.x),
            levelWidth - this.viewportWidth);
        let finalColumn = Math.max(
            Math.min(
                levelWidth, 
                this.x + this.viewportWidth
            ), this.viewportWidth);
        return {
            startingRow: startingRow,
            startingColumn: startingColumn,
            finalRow: finalRow,
            finalColumn: finalColumn
        };
    }

}