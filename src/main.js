import level1 from "./level1.js";
import World from "./World.js";
import loadImages from './loadImages.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 16;

let images = loadImages();


let world = new World(level1, images, TILE_SIZE, ctx);

setInterval(() => {
    world.draw();
}, 500);

