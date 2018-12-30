import Character from "./GameObject.js";

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

export default class Hero extends Character {
    constructor(x, y, imageData, tileSize) {
        super(x, y, imageData, tileSize);
        document.addEventListener('keydown', (event) => {
            this.handleKeys(event);
        });
    }
    handleKeys(event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.x -= 1;
                break;
            case UP_ARROW:
                this.y -= 1;
                break;
            case RIGHT_ARROW:
                this.x += 1;
                break;
            case DOWN_ARROW:
                this.y += 1;
        }
    }
}