import Character from './Character.js';

export default class Monster extends Character {
  constructor(x, y, imageData, world, species) {
    super(x, y, imageData, world, "monster", {
      hp: 1,
      att: 1,
      def: 1
    });
    this.species = species;
    switch(species) {
      case "bat":
        this.stats = {
          hp: 2,
          att: 1,
          def: 1
        }
      break;
      case "skeleton":
        this.stats = {
          hp: 4,
          att: 2,
          def: 2
        }
    }
  }

  determineDirection () {
    let dir = {};
    switch(this.species) {
      case "bat":
        dir = {
          x: Math.ceil(Math.random() * 3) - 2,
          y: Math.ceil(Math.random() * 3) - 2,
        }
        break;
      case "skeleton":
        if (this.world.hero.x > this.x) {
          dir.x = 1;
        } else if (this.world.hero.x < this.x) {
          dir.x = -1;
        } else {
          dir.x = 0;
        }
        if (this.world.hero.y > this.y) {
          dir.y = 1;
        } else if (this.world.hero.y < this.y) {
          dir.y = -1;
        } else {
          dir.y = 0;
        }
        console.log(dir);
        break;
    }
    return dir;
  }

  move() {
    let dir = this.determineDirection();
    let newCoords = {x: 0, y: 0};
    let isMoving = false;
    if((dir.x !== 0 || dir.y !== 0) && this.world.isMovementPossible(this.x, this.y, dir)) {
      newCoords = {
        x: this.x + dir.x,
        y: this.y + dir.y
      }
      isMoving = true;
      
    } else if (dir.x !== 0 && this.world.isMovementPossible(this.x, this.y, {x: dir.x, y:0})) {
      newCoords = {
        x: this.x + dir.x,
        y: this.y
      }
      isMoving = true;
    } else if (dir.y !== 0 && this.world.isMovementPossible(this.x, this.y, {x: 0, y: dir.y})) {
      newCoords = {
        x: this.x,
        y: this.y + dir.y
      };
      isMoving = true;
    }
    if(!isMoving) return;
    for (let gameObject of this.world.currentObjectList) {
      if (gameObject.x === newCoords.x && gameObject.y === newCoords.y) {
        console.log(gameObject);
        return;
      }
    }
    this.x = newCoords.x;
    this.y = newCoords.y;
  }

  takeDamage(damage) {
    this.stats.hp -= damage;
    if (this.stats.hp <= 0) {
      //simply remove the object from the list for this level
      this.world.currentObjectList.splice(this.world.currentObjectList.indexOf(this), 1);
    }
  }
}