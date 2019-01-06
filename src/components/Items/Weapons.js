import Weapon from './Weapon.js';

export class Sword extends Weapon {
  constructor() {
    super("sword", 1, 10);
    console.log(typeof this);
  }
}

