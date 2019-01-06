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
    }
  }

  determineDirection () {
    let dir;
    switch(this.species) {
      case "bat":
        dir = {
          x: Math.ceil(Math.random() * 3) - 2,
          y: Math.ceil(Math.random() * 3) - 2,
        }
        break;
    }
    return dir;
  }

  move() {
    let dir = this.determineDirection();
    if((dir.x !== 0 || dir.y !== 0) && this.world.isMovementPossible(this.x, this.y, dir)) {
      const newCoords = {
        x: this.x + dir.x,
        y: this.y + dir.y
      }
      for (let gameObject of this.world.currentObjectList) {
        if (gameObject.x === newCoords.x && gameObject.y === newCoords.y) {
          console.log(gameObject);
          return;
        }
      }
      this.x = newCoords.x;
      this.y = newCoords.y;
    }
  }

  takeDamage(damage) {
    this.stats.hp -= damage;
    if (this.stats.hp <= 0) {
      this.world.currentObjectList.splice(this.world.currentObjectList.indexOf(this), 1);
    }
  }
}