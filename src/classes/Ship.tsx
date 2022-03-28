export class Ship {
  size: number;
  hp: number;
  constructor(size: number) {
    this.size = size;
    this.hp = size;
  }

  takeDamage() {
    console.log("SHOT");
    if (this.hp > 0) this.hp -= 1;

    if (this.hp === 0) console.log("SINK!");
    console.log(this.hp);
  }
}
