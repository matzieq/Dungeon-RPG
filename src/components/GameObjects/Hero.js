import Character from "./Character.js";

const START_HP = 20;
const START_ATT = 1;
const START_DEF = 1;

export default class Hero extends Character {
    constructor(x, y, imageData, world) {
        super(x, y, imageData, world, "hero", {
            hp: START_HP,
            att: START_ATT,
            def: START_DEF
        });
        this.inventory = [];
        this.equipment = {
            weapon: null,
            armor: null,
            ring: null
        }
        console.log(this.stats);
    }

    pickUp (item) {
        this.inventory.push(item);
    }

    drop (itemNumber) {
        this.inventory.splice(itemNumber, 1);
    }

    move(dir) {
        if(this.world.isMovementPossible(this.x, this.y, dir)) {
            const newHeroCoords = {
              x: this.x + dir.x,
              y: this.y + dir.y
            }
            for (let gameObject of this.world.currentObjectList) {
              if (gameObject.x === newHeroCoords.x && gameObject.y === newHeroCoords.y) {
                if (gameObject.type === "monster") {
                    gameObject.takeDamage(this.stats.att);
                }
                console.log(gameObject);
                return;
              }
            }
            this.x = newHeroCoords.x;
            this.y = newHeroCoords.y;
        }
    }
}