import Item from "./Item.js";

export default class Weapon extends Item {
  constructor(name, power, value) {
    super(value);
    this.name = name;
    this.power = power;
  }
}