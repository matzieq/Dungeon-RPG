import Character from "./Character.js";

const START_HP = 20;
const START_ATT = 1;
const START_DEF = 1;

export default class Hero extends Character {
    constructor(x, y, imageData, tileSize) {
        super(x, y, imageData, tileSize, {
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
}