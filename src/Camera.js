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
}