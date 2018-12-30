import Hero from "./Hero.js";

const FLOOR = 0;
const WALL = 1;
const HERO = 2;

export default class World {
    constructor(level, imageList, tileSize, drawingContext) {
        this.height = level.length;
        this.width = level[0].length;
        this.tileSize = tileSize;
        this.levelLayout = level;
        this.imageList = imageList;
        this.drawingContext = drawingContext;
    }

    loadLevel () {
        for (let row = 0; row < this.levelLayout.length; row++) {
            for (let column = 0; column < this.levelLayout[row].length; column++) {
                const tileTypeHere = this.levelLayout[row][column];
                if (tileTypeHere === HERO) {
                    this.hero = new Hero(column, row, imageList[HERO], this.tileSize);
                }
            }
        }
    }

    draw() {
        this.drawingContext.fillStyle = '#000';
        this.drawingContext.fillRect(0, 0, canvas.width, canvas.height);
        for (let row = 0; row < this.levelLayout.length; row++) {
            for (let column = 0; column < this.levelLayout[row].length; column++) {
                if (this.levelLayout[row][column] === WALL) {
                    if (this.imageList[WALL].loaded) {
                        
                        this.drawingContext.drawImage(this.imageList[WALL].handle, column * this.tileSize, row * this.tileSize);

                    }             
                }
            }
        }
    }

    
}