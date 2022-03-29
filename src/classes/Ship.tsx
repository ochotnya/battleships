export class Ship {
  size: number;
  hp: number;
  constructor(size: number) {
    this.size = size;
    this.hp = size;
  }

  takeDamage() {
    if (this.hp > 0) this.hp -= 1;
  }
}
