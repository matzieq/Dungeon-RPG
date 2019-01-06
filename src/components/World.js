import Hero from "./GameObjects/Hero.js";
import tileData from '../tiledata/tileData.js';
import UI from '../tiledata/UI.js';
import Camera from './Camera.js';
import Monster from './GameObjects/Monsters.js';
import { Sword } from './Items/Weapons.js';

const FLOOR = 0;
const WALL = 1;

const HERO = 1;
const BAT = 2;

const GAME_WIDTH = 256;
const GAME_HEIGHT = 160;


const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

export default class World {
  constructor(levels, tileSize) {
    this.height = levels[0].layout.length;
    this.width = levels[0].layout[0].length;
    this.tileSize = tileSize;
    this.levels = levels;
    this.currentLevel = 0;
    this.tileData = {
      tiles: this.loadImages(tileData.tiles),
      characters: this.loadImages(tileData.characters),
      UI: this.loadImages(tileData.UI)
    }
    this.loadLevel(this.currentLevel);
    // this.currentObjectList = this.levels[this.currentLevel].objectList;
    this.createCanvas();
    document.addEventListener('keydown', (event) => {
      this.handleKeys(event);
    });
    window.requestAnimationFrame(() => {
      this.step();
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
    this.currentObjectList = this.levels[this.currentLevel].objectList;

    for (let row = 0; row < currentLevelObjectData.length; row++) {

      for (let column = 0; column < currentLevelObjectData[row].length; column++) {

        const tileTypeHere = currentLevelObjectData[row][column];

        if (tileTypeHere === HERO) {
          this.hero = new Hero(column, row, this.tileData.characters[HERO], this);
          this.camera = new Camera(0, 0, 12, 8);
          this.currentObjectList.push(this.hero);
        }

        if (tileTypeHere === BAT) {
          let bat = new Monster(column, row, this.tileData.characters[BAT], this, "bat");           
          this.currentObjectList.push(bat);
          console.log(this.currentObjectList);
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
    // const objectsInCurrentLevel = this.levels[this.currentLevel].objectList;

    for (let row = startingRow; row < finalRow; row++) {

      for (let column = startingColumn; column < finalColumn; column++) {
        let adjustedColumn = column - startingColumn;
        let adjustedRow = row - startingRow;
        //DRAW WALLS
        if (currentLeveLLayout[row][column] === WALL) {
          this.drawTile(this.tileData.tiles[WALL], adjustedColumn, adjustedRow);       
        }
        //DRAW OBJECTS
        for (let object of this.currentObjectList) {
          if (object.x === column && object.y === row) {
            object.draw(this.drawingContext, adjustedColumn, adjustedRow);
          }
        }
        
      }
    }
  }

  drawUI () {
    for (let row = 0; row < UI.length; row++) {
      for (let column = 0; column < UI[0].length; column++) {
        let tileTypeHere = UI[row][column];              
        if (tileTypeHere) {
          this.drawTile(this.tileData.UI[tileTypeHere - 1], column, row);
        }
      }
    }
  }

  step() {
    this.draw();
    window.requestAnimationFrame(() => {
      this.step();
    });
  }

  handleKeys(event) {
    let direction = {x: 0, y: 0};
    switch (event.keyCode) {
      case LEFT_ARROW:
        direction.x = -1;
        break;
      case UP_ARROW:
        direction.y = -1;
        break;
      case RIGHT_ARROW:
        direction.x = 1;
        break;
      case DOWN_ARROW:
        direction.y = 1;
        break;
    }
    const objectList = this.levels[this.currentLevel].objectList;
    for (let i = 1; i < objectList.length; i++) {
      objectList[i].move();
    }
    this.hero.move(direction);
  }

  isMovementPossible(currentX, currentY, direction) {
    const currentLeveLLayout = this.levels[this.currentLevel].layout;
    return this.tileData.tiles[
      currentLeveLLayout[currentY + direction.y][currentX + direction.x]
    ]
    .passable;
  }
}