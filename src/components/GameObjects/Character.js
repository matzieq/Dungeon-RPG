import GameObject from './GameObject.js';

export default class Character extends GameObject {
  constructor(x, y, imageData, tileSize, stats) {
    super(x, y, imageData, tileSize);
    this.stats = stats;
  }
}

/**
 * 
 * STATS = { hp, att, def }
 * 
 */