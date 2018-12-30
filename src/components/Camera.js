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


    /*
        This convoluted function calculates which part of the dungeon to display.
        Basically it checks whether the camera coordinates are not out of bounds,
        and if this is the case, then it sets it to an appropriate minimum/maximum
    */
    calculateViewportCoordinates (levelWidth, levelHeight) {
        /*
            Starting row: if camera Y is lower than 0, then sets it to 0, and 
            prevents the bottom edge of the viewport from exceeding level boundaries
        */
        let startingRow = Math.min(
            Math.max(0, this.y),
            levelHeight - this.viewportHeight);
        /*
            Final row: if camera's bottom edge exceeds level height,
            then it sets it to level height. Also, if it would display less than its
            full viewport, then it sets it to the value of the viewport
         */
        let finalRow = Math.max(
            Math.min(
                levelHeight, 
                this.y + this.viewportHeight
            ), this.viewportHeight);
            
        // Similarly for columns
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