import GameObject from './GameObject.js';

export default class Character extends GameObject {
  constructor(x, y, imageData, world, type, stats) {
    super(x, y, imageData, world, type);
    this.stats = stats;
  }
}

/**
 * 
 * STATS = { hp, att, def }
 * 
 */