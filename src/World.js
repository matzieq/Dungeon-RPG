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
                    this.camera = new Camera(0, 0, 16, 10);
                    this.levelObjectList.push(this.hero);
                }
            }
        }
    }

    
    draw() {
        this.drawBackground();
        this.drawDungeon();
        // this.drawObjects();
        this.camera.centerOn(this.hero);
        
    }

    drawBackground () {
        this.drawingContext.fillStyle = '#000';
        this.drawingContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawDungeon() {
        let startingRow = Math.min(
            Math.max(0, this.camera.y),
            this.levelLayout.length - this.camera.viewportHeight);
        let finalRow = Math.max(
            Math.min(
                this.levelLayout.length, 
                this.camera.y + this.camera.viewportHeight
            ), this.camera.viewportHeight);

        let startingColumn = Math.min(
            Math.max(0, this.camera.x),
            this.levelLayout[0].length - this.camera.viewportWidth);
        let finalColumn = Math.max(
            Math.min(
                this.levelLayout[0].length, 
                this.camera.x + this.camera.viewportWidth
            ), this.camera.viewportWidth);

        for (let row = startingRow; row < finalRow; row++) {
            for (let column = startingColumn; column < finalColumn; column++) {
                let adjustedColumn = column - startingColumn;
                let adjustedRow = row - startingRow;
                if (this.levelLayout[row][column] === WALL) {
                    if (this.imageList[WALL].loaded) {
                        
                        this.drawingContext.drawImage(
                            this.imageList[WALL].handle, 
                            adjustedColumn * this.tileSize, 
                            adjustedRow * this.tileSize
                        );

                    }             
                }
                if (this.hero.x === column && this.hero.y === row) {
                    this.hero.draw(this.drawingContext, adjustedColumn, adjustedRow);
                }
            }
        }
    }

    drawObjects() {
        for (let gameObject of this.levelObjectList) {
            gameObject.draw(this.drawingContext, gameObject.x - this.camera.x, gameObject.y - this.camera.y);
        }
    }
    
}