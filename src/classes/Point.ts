export class Point {
  x: number;
  y: number;
  constructor(x?: number, y?: number) {
    this.x = x || Math.floor(Math.random() * 10);
    this.y = y || Math.floor(Math.random() * 10);
  }
}
