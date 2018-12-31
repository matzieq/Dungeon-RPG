import Hero from "./Hero.js";
import tileData from '../tiledata/tileData.js';
import UI from '../tiledata/UI.js';
import Camera from './Camera.js';

const FLOOR = 0;
const WALL = 1;

const HERO = 1;

const GAME_WIDTH = 256;
const GAME_HEIGHT = 160;

export default class World {
  constructor(levels, tileSize) {
    this.height = levels[0].layout.length;
    this.width = levels[0].layout[0].length;
    this.tileSize = tileSize;
    this.levels = levels;
    this.currentLevel = 0;
    this.tileList = this.loadImages(tileData.tiles);
    this.characterList = this.loadImages(tileData.characters);
    this.rectangleImageList = this.loadImages(tileData.UI);
    this.levelObjectList = [];
    this.loadLevel(this.currentLevel);
    this.createCanvas();

    window.requestAnimationFrame((timestamp) => {
      this.step(timestamp);
    });
  }


  // creates a canvas element, I'm moving it from the html file for encapsulation purposes
  createCanvas () {
    this.canvas = document.createElement("canvas");
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
    this.canvas.id = "canvas";
    document.querySelector("body").appendChild(this.canvas);
    this.drawingContext = this.canvas.getContext('2d');      
  }

  loadImages (imageData) {
    let images = imageData;

    for (let image of images) {
      if (image.type === "FLOOR") continue;
      let imageElement = new Image();
      imageElement.onload = function () {
          image.loaded = true;
          image.handle = imageElement;
      }
      imageElement.src = image.url;
    }

    return images;
  }

  // finds the location of objects in the level and creates them from classes
  loadLevel(levelNumber) {
    this.currentLevel = levelNumber;
    let currentLevelObjectData = this.levels[levelNumber].gameObjects;
    for (let row = 0; row < currentLevelObjectData.length; row++) {
      for (let column = 0; column < currentLevelObjectData[row].length; column++) {
          const tileTypeHere = currentLevelObjectData[row][column];
          if (tileTypeHere === HERO) {
            this.hero = new Hero(column, row, this.characterList[HERO], this.tileSize);
            this.camera = new Camera(0, 0, 12, 8);
            this.levelObjectList.push(this.hero);
            // this.levelLayout[row][column] = FLOOR;
          }
      }
    }
  }

  
  draw() {
    this.drawBackground();
    this.drawUI();
    this.camera.centerOn(this.hero);
    this.drawDungeon();
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
    const { 
      startingRow, 
      startingColumn, 
      finalRow, 
      finalColumn 
    } = this.camera.calculateViewportCoordinates(this.width, this.height);
    const currentLeveLLayout = this.levels[this.currentLevel].layout;
    for (let row = startingRow; row < finalRow; row++) {
      for (let column = startingColumn; column < finalColumn; column++) {
        let adjustedColumn = column - startingColumn;
        let adjustedRow = row - startingRow;
        if (currentLeveLLayout[row][column] === WALL) {
          this.drawTile(this.tileList[WALL], adjustedColumn, adjustedRow);       
        }
        if (this.hero.x === column && this.hero.y === row) {
          this.hero.draw(this.drawingContext, adjustedColumn, adjustedRow);
        }
      }
    }
  }

  drawUI () {
    for (let row = 0; row < UI.length; row++) {
      for (let column = 0; column < UI[0].length; column++) {
        let tileTypeHere = UI[row][column];              
        if (tileTypeHere) {
          this.drawTile(this.rectangleImageList[tileTypeHere - 1], column, row);
        }
      }
    }
  }

  step(timestamp) {
    this.draw();
    window.requestAnimationFrame((timestamp) => {
      this.step(timestamp);
    });
  }
}