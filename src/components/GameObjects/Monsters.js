import Character from './Character.js';

export class Bat extends Character {
  constructor(x, y, imageData, tileSize) {
    super(x, y, imageData, tileSize, {
      hp: 1,
      att: 1,
      def: 1
    });
  }
}