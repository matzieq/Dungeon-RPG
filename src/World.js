import Hero from "./Hero.js";
import loadImages from "./loadImages.js";
import Camera from './Camera.js';

const FLOOR = 0;
const WALL = 1;
const HERO = 2;

const GAME_WIDTH = 256;
const GAME_HEIGHT = 160;

export default class World {
    constructor(level, tileSize) {
        this.height = level.length;
        this.width = level[0].length;
        this.tileSize = tileSize;
        this.levelLayout = level;
        this.imageList = loadImages();
        this.levelObjectList = [];
        this.loadLevel();
        this.createCanvas();
    }


    //this just creates a canvas element, I'm moving it from the html file for encapsulation purposes
    createCanvas () {
        this.canvas = document.createElement("canvas");
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        this.canvas.id = "canvas";
        document.querySelector("body").appendChild(this.canvas);
        this.drawingContext = this.canvas.getContext('2d');
        
    }

    //this finds the location of objects in the level and creates them from classes
    loadLevel () {
        for (let row = 0; row < this.levelLayout.length; row++) {
            for (let column = 0; column < this.levelLayout[row].length; column++) {
                const tileTypeHere = this.levelLayout[row][column];
                if (tileTypeHere === HERO) {
                    this.hero = new Hero(column, row, this.imageList[HERO], this.tileSize);
                    this.camera = new Camera(0, 0, 12, 8);
                    this.levelObjectList.push(this.hero);
                }
            }
        }
    }

    
    draw() {
        this.drawBackground();
        this.drawDungeon();
        this.camera.centerOn(this.hero);
    }

    drawTile(imageData, x, y) {
        if (imageData.loaded) {                       
            this.drawingContext.drawImage(
                imageData.handle, 
                x * this.tileSize, 
                y * this.tileSize
            );
        }  
    }

    drawBackground () {
        this.drawingContext.fillStyle = '#000';
        this.drawingContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawDungeon() {
        const { startingRow, startingColumn, finalRow, finalColumn } =
        this.camera.calculateViewportCoordinates(this.width, this.height);
        for (let row = startingRow; row < finalRow; row++) {
            for (let column = startingColumn; column < finalColumn; column++) {
                let adjustedColumn = column - startingColumn;
                let adjustedRow = row - startingRow;
                if (this.levelLayout[row][column] === WALL) {
                    this.drawTile(this.imageList[WALL], adjustedColumn, adjustedRow);       
                }
                if (this.hero.x === column && this.hero.y === row) {
                    this.hero.draw(this.drawingContext, adjustedColumn, adjustedRow);
                }
            }
        }
    }
}