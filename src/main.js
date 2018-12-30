import level1 from "./level1.js";
import World from "./World.js";

const TILE_SIZE = 16;

let world = new World(level1, TILE_SIZE);

setInterval(() => {
    world.draw();
}, 500);

